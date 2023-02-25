import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';

@Component({
  selector: 'createcourt',
  templateUrl: './createcourt.component.html',
  styleUrls: ['./createcourt.component.scss']
})
export class CreateCourtComponent implements OnInit {

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

  ngOnInit(): void { }

  onSubmit(): void {
    console.log("NewCourtDetailComponent.onSubmit(): ");
    console.log(this.form.value);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("NewCourtDetailComponent.onSubmit(): form is invalid");
      return;
    }

    var value: Court = Court.fromFormGroup(this.form)
    this.playersService.createCourt(value)
      .subscribe({
        next: (response: any) => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("NewCourtDetailComponent.ngOnInit: response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("NewCourtDetailComponent.ngOnInit: Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 200) {
            console.log("NewCourtDetailComponent.ngOnInit: Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("NewCourtDetailComponent.onSubmit: ok")
            this.router.navigate(["app/courts"])
          }
        },
        error: (err: any) => {
          console.log("NewCourtDetailComponent.onSubmit: error: " + JSON.stringify(err))
          this.alertService.error(err)
        },
        complete: () => {
          console.log("NewCourtDetailComponent.onSubmit: complete")
          this.router.navigate(["app/courts"])
        }
      })
  }

  onCancel(): void {
    console.log("NewCourtDetailComponent.onCancel(): ");
    this.location.back();
  }

  onDelete(): void {
    console.log("NewCourtDetailComponent.onDelete(): ");
    console.log(this.form.value);

    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("NewCourtDetailComponent.onDelete(): form is invalid");
      return;
    }

    this.playersService.deleteCourt(this.id)
      .subscribe(
        data => {
          console.log("NewCourtDetailComponent.onDelete: data: " + JSON.stringify(data))
        },
        error => {
          console.log("NewCourtDetailComponent.onDelete: error: " + JSON.stringify(error))
          this.alertService.error(error.error.message);
        },
        () => {
          console.log("NewCourtDetailComponent.onDelete: complete")
          this.location.back();
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
