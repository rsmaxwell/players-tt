import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { PlayersService } from 'src/app/service/players.service';


@Component({
  selector: 'grid-view-heading',
  templateUrl: './heading.html',
  styleUrls: ['./heading.scss'],
})
export class GridViewHeadingComponent implements OnInit, OnDestroy {

  subscription_onFill!: Subscription
  subscription_onClear!: Subscription

  @Input() court!: Court;

  constructor(
    private playersService: PlayersService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log("GridViewHeadingComponent.ngOnDestroy()")
    if (this.subscription_onFill != undefined) {
      this.subscription_onFill.unsubscribe()
    }

    if (this.subscription_onClear != undefined) {
      this.subscription_onClear.unsubscribe()
    }
  }

  onFill(court: Court): void {
    console.log("GridViewHeadingComponent.onFill");
    this.subscription_onFill = this.playersService.fillCourt(court)
      .subscribe({
        next: (response: any) => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("GridViewHeadingComponent.onFill(): response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("GridViewHeadingComponent.onFill(): Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 200) {
            console.log("GridViewHeadingComponent.onFill(): Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (!('positions' in object)) {
            console.log("GridViewHeadingComponent.onFill(): Error: missing 'positions' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("GridViewHeadingComponent.onFill(): ok")
            court.positions = object.positions
            Court.expand(court)            
          }
        },
        error: (err: any) => {
          console.log("GridViewHeadingComponent.onFill(): error: " + JSON.stringify(err))
          this.alertService.error(err)
        },
        complete: () => {
          console.log("GridViewHeadingComponent.onFill(): complete")
        }
  })
  }

  onClear(court: Court): void {
    console.log("GridViewHeadingComponent.onClear");
    this.playersService.clearCourt(court)
      .subscribe(
        response => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("GridViewHeadingComponent.onClear(): response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("GridViewHeadingComponent.onClear(): Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 200) {
            console.log("GridViewHeadingComponent.onClear(): Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("GridViewHeadingComponent.onClear(): ok")
            court.positions = []
            Court.expand(court)
          }
        },
        error => {
          console.log("GridViewHeadingComponent.onClear(): error: " + JSON.stringify(error))
          this.alertService.error(error)
        },
        () => {
          console.log("GridViewHeadingComponent.onClear(): complete")
        }
      )
  }
}
