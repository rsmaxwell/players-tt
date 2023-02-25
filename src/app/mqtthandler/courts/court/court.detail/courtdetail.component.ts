import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Subscription } from 'rxjs';
import { Court } from 'src/app/model/court';

@Component({
  selector: 'courtdetail',
  templateUrl: './courtdetail.component.html',
  styleUrls: ['./courtdetail.component.scss']
})
export class CourtDetailComponent implements OnInit, OnDestroy {

  subscription_getCourt!: Subscription
  subscription_updateCourt!: Subscription
  subscription_deleteCourt!: Subscription
  submitted = false;
  hide = true;
  sub: any;
  id: any;

  name = new FormControl('', [
    Validators.required
  ])

  form = new FormGroup({
    name: this.name
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private alertService: AlertService,
    private location: Location
  ) { }

  ngOnDestroy(): void {
    console.log("CourtDetailComponent.ngOnDestroy()")
    if (this.subscription_getCourt != undefined) {
      this.subscription_getCourt.unsubscribe()
    }

    if (this.subscription_updateCourt != undefined) {
      this.subscription_updateCourt.unsubscribe()
    }

    if (this.subscription_deleteCourt != undefined) {
      this.subscription_deleteCourt.unsubscribe()
    }
  }
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        var idParam = params['id'];

        console.log("CourtDetailComponent.ngOnInit: idParam: " + idParam)

        this.subscription_getCourt = this.playersService.getCourt(idParam)
        .subscribe(
          response => {
            let payload = response.payload.toString()
            let payload2 = payload
            if (payload.length > 100) {
              payload2 = payload.substring(0, 100) + "..."
            }
            console.log("CourtDetailComponent.ngOnInit: response: " + payload2)
            let object = JSON.parse(payload)

            if (!('status' in object)) {
              console.log("CourtDetailComponent.ngOnInit: Error: missing 'status' field in response")
              this.alertService.error("Unexpected response from server")
            }
            else if (object.status != 200) {
              console.log("CourtDetailComponent.ngOnInit: Error: bad status in response")
              this.alertService.error("Unexpected response from server")
            }
            else if (!('court'! in object)) {
              console.log("CourtDetailComponent.ngOnInit: Error: missing 'court' field in response")
              this.alertService.error("Unexpected response from server")
            }
            else {
              let court = object.court
              this.id = court.id

              delete court.id
              this.form.setValue(court)
            }
          }
        )
      },
      error => {
        console.log("CourtDetailComponent.ngOnInit: error: " + JSON.stringify(error))
        this.alertService.error(error)
      }
    )
  }

  onSubmit(): void {
    console.log("CourtDetailComponent.onSubmit(): ");
    console.log(this.form.value);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("CourtDetailComponent.onSubmit(): form is invalid");
      return;
    }

    let value: Court = Court.fromFormGroup(this.form)
    this.subscription_updateCourt = this.playersService.updateCourt(this.id, value)
      .subscribe({
        next: (response: any) => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("CourtDetailComponent.ngOnInit: response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("CourtDetailComponent.ngOnInit: Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 200) {
            console.log("CourtDetailComponent.ngOnInit: Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("CourtDetailComponent.onSubmit: ok")
            this.router.navigate(["app/courts"])
          }
        },
        error: (err: any) => {
          console.log("CourtDetailComponent.onSubmit: error: " + JSON.stringify(err))
          this.alertService.error(err)
        },
        complete: () => {
          console.log("CourtDetailComponent.onSubmit: complete")
          this.router.navigate(["app/courts"])
        }
      })
  }

  onCancel(): void {
    console.log("CourtDetailComponent.onCancel(): ");
    this.location.back();
  }

  onDelete(): void {
    console.log("CourtDetailComponent.onDelete(): ");
    console.log(this.form.value);

    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("CourtDetailComponent.onDelete(): form is invalid");
      return;
    }

    this.subscription_deleteCourt = this.playersService.deleteCourt(this.id)
    .subscribe(
      response => {
        let payload = response.payload.toString()
        let payload2 = payload
        if (payload.length > 100) {
          payload2 = payload.substring(0, 100) + "..."
        }
        console.log("CourtDetailComponent.onDelete: response: " + payload2)
        let object = JSON.parse(payload)

        if (!('status' in object)) {
          console.log("CourtDetailComponent.onDelete: Error: missing 'status' field in response")
          this.alertService.error("Unexpected response from server")
        }
        else if (object.status != 200) {
          console.log("CourtDetailComponent.onDelete: Error: bad status in response")
          this.alertService.error("Unexpected response from server")
        }
        else {
          console.log("CourtDetailComponent.onDelete: success")
          this.router.navigate(["app/courts"])
        }
      }
    )
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return "This field is required";
    }
    if (formControl.hasError('minlength')) {
      let requiredLength = formControl.errors!['minlength'].requiredLength     
      return "The minimum length for this field is " + String(requiredLength) + " characters.";
    }
    if (formControl.hasError('maxlength')) {
      let requiredLength = formControl.errors!['maxlength'].requiredLength     
      return "The maximum length for this field is " + String(requiredLength) + " characters.";
    }

    return '';
  }

}
