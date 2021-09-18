import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/alert/alert/alert.service';

@Component({
  selector: 'newcourt',
  templateUrl: './newcourt.component.html',
  styleUrls: ['./newcourt.component.scss']
})
export class NewCourtComponent implements OnInit {

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

    this.playersService.newCourt(this.form.value)
      .subscribe(
        data => {
          console.log("NewCourtDetailComponent.onSubmit: data: " + JSON.stringify(data))
        },
        error => {
          console.log("NewCourtDetailComponent.onSubmit: error: " + JSON.stringify(error))
          this.alertService.error(error.message)
        },
        () => {
          console.log("NewCourtDetailComponent.onSubmit: complete")
          this.router.navigate(["app/courts"])
        }
      )
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
      let requiredLength = formControl.errors!.minlength.requiredLength     
      return "The minimum length for this field is " + String(requiredLength) + " characters.";
    }
    if (formControl.hasError('maxlength')) {
      let requiredLength = formControl.errors!.maxlength.requiredLength     
      return "The maximum length for this field is " + String(requiredLength) + " characters.";
    }

    return '';
  }

}
