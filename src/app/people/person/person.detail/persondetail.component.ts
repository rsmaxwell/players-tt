import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/alert/alert/alert.service';

@Component({
  selector: 'persondetail',
  templateUrl: './persondetail.component.html',
  styleUrls: ['./persondetail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  submitted = false;
  hide = true;
  sub: any;
  id: any;

  firstname = new FormControl('', [
    Validators.required
  ])
  lastname = new FormControl('', [
    Validators.required
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  knownas = new FormControl('', [
    Validators.required
  ])
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern("\\+?[0-9 ]*")
  ])
  status = new FormControl('', [
    Validators.required
  ])

  form = new FormGroup({
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    knownas: this.knownas,
    phone: this.phone,
    status: this.status
  });

  statuses: any = ['admin', 'player', 'inactive', 'suspended']


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private alertService: AlertService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        var idParam = params['id'];

        // console.log("PersonDetailComponent.ngOnInit: idParam: " + idParam)

        this.playersService.getPerson(idParam)
          .subscribe(
            person => {
              console.log("PersonDetailComponent.ngOnInit: data: " + JSON.stringify(person))
              this.id = person.id
              this.form.setValue({
                firstname: person.firstname,
                lastname: person.lastname,
                knownas: person.knownas,
                email: person.email,
                phone: person.phone,
                status: person.status
              });
            },
            error => {
              console.log("PersonDetailComponent.ngOnInit: error: " + JSON.stringify(error))
              this.alertService.error(error)
            }
          )
      },
      error => {
        console.log("PersonDetailComponent.ngOnInit: error: " + JSON.stringify(error))
        this.alertService.error(error)
      }
    )
  }

  onSubmit(): void {
    console.log("PersonDetailComponent.onSubmit(): ");
    console.log(this.form.value);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("PersonDetailComponent.onSubmit(): form is invalid");
      return;
    }

    this.playersService.updatePerson(this.id, this.form.value)
      .subscribe(
        data => {
          console.log("PersonDetailComponent.onSubmit: data: " + JSON.stringify(data))
        },
        error => {
          console.log("PersonDetailComponent.onSubmit: error: " + JSON.stringify(error))
          this.alertService.error(error)
        },
        () => {
          console.log("PersonDetailComponent.onSubmit: complete")
          this.router.navigate(["app/people"])
        }
      )
  }

  onCancel(): void {
    console.log("PersonDetailComponent.onCancel(): ");
    this.router.navigate(["app/people"])
  }

  onDelete(): void {
    console.log("PersonDetailComponent.onDelete(): ");
    console.log(this.form.value);

    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("PersonDetailComponent.onDelete(): form is invalid");
      return;
    }

    this.playersService.deletePerson(this.id)
      .subscribe(
        data => {
          console.log("PersonDetailComponent.onDelete: data: " + JSON.stringify(data))
        },
        error => {
          console.log("PersonDetailComponent.onDelete: error: " + JSON.stringify(error))
          this.alertService.error(error.error.message);
        },
        () => {
          console.log("PersonDetailComponent.onDelete: complete")
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
    if (formControl.hasError('email')) {     
      return "Not a valid email address";
    }
    if (formControl.hasError('pattern')) {     
      return "Not a valid phone number";
    } 

    return '';
  }

}
