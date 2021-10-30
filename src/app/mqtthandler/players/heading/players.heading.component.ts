import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { PlayersService } from 'src/app/service/players.service';


@Component({
  selector: 'players-heading',
  templateUrl: './players.heading.component.html',
  styleUrls: ['./players.heading.component.scss'],
})
export class PlayersHeadingComponent implements OnInit, OnDestroy {

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
    console.log("PlayersHeadingComponent.ngOnDestroy()")
    if (this.subscription_onFill != undefined) {
      this.subscription_onFill.unsubscribe()
    }

    if (this.subscription_onClear != undefined) {
      this.subscription_onClear.unsubscribe()
    }
  }

  onFill(court: Court): void {
    console.log("PlayersHeadingComponent.onFill");
    this.subscription_onFill = this.playersService.fillCourt(court)
      .subscribe(
        response => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("PlayersHeadingComponent.onFill(): response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("PlayersHeadingComponent.onFill(): Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 0) {
            console.log("PlayersHeadingComponent.onFill(): Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (!('positions' in object)) {
            console.log("PlayersHeadingComponent.onFill(): Error: missing 'positions' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("PlayersHeadingComponent.onFill(): ok")
            court.positions = object.positions
            Court.expand(court)            
          }
        },
        error => {
          console.log("PlayersHeadingComponent.onFill(): error: " + JSON.stringify(error))
          this.alertService.error(error)
        },
        () => {
          console.log("PlayersHeadingComponent.onFill(): complete")
        }
      )
  }

  onClear(court: Court): void {
    console.log("PlayersHeadingComponent.onClear");
    this.playersService.clearCourt(court)
      .subscribe(
        response => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("PlayersHeadingComponent.onClear(): response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("PlayersHeadingComponent.onClear(): Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 0) {
            console.log("PlayersHeadingComponent.onClear(): Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("PlayersHeadingComponent.onClear(): ok")
            court.positions = []
            Court.expand(court)
          }
        },
        error => {
          console.log("PlayersHeadingComponent.onClear(): error: " + JSON.stringify(error))
          this.alertService.error(error)
        },
        () => {
          console.log("PlayersHeadingComponent.onClear(): complete")
        }
      )
  }
}
