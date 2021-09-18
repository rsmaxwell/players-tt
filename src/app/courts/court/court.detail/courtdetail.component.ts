import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/alert/alert/alert.service';

@Component({
  selector: 'courtdetail',
  templateUrl: './courtdetail.component.html',
  styleUrls: ['./courtdetail.component.scss']
})
export class CourtDetailComponent implements OnInit {

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

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        var idParam = params['id'];

        console.log("CourtDetailComponent.ngOnInit: idParam: " + idParam)

        this.playersService.getCourt(idParam)
          .subscribe(
            court => {
              console.log("CourtDetailComponent.ngOnInit: data: " + JSON.stringify(court))
              this.id = court.id
              this.form.setValue({
                name: court.name
              });
            },
            error => {
              console.log("CourtDetailComponent.ngOnInit: error: " + JSON.stringify(error))
              this.alertService.error(error)
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

    this.playersService.updateCourt(this.id, this.form.value)
      .subscribe(
        data => {
          console.log("CourtDetailComponent.onSubmit: data: " + JSON.stringify(data))
        },
        error => {
          console.log("CourtDetailComponent.onSubmit: error: " + JSON.stringify(error))
          this.alertService.error(error.message)
        },
        () => {
          console.log("CourtDetailComponent.onSubmit: complete")
          this.router.navigate(["app/courts"])
        }
      )
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

    this.playersService.deleteCourt(this.id)
      .subscribe(
        data => {
          console.log("CourtDetailComponent.onDelete: data: " + JSON.stringify(data))
        },
        error => {
          console.log("CourtDetailComponent.onDelete: error: " + JSON.stringify(error))
          this.alertService.error(error.error.message);
        },
        () => {
          console.log("CourtDetailComponent.onDelete: complete")
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
