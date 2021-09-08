import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ControlValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/_alert';
import { Location } from '@angular/common';

@Component({
  selector: 'persondetail',
  templateUrl: './persondetail.component.html',
  styleUrls: ['./persondetail.component.scss']
})
export class PersonDetailComponent implements OnInit, ControlValueAccessor {

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


  personDetailForm = new FormGroup({
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

  // ControlValueAccessor Implementation
  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any) {
    console.log("PersonDetailComponent.registerOnChange")
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    console.log("PersonDetailComponent.registerOnTouched")
    this.onTouched = fn;
  }

  writeValue(value: any) {
    console.log("PersonDetailComponent.writeValue")
    //this.value = value;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        var idParam = params['id'];

        // console.log("PersonDetailComponent.ngOnInit: idParam: " + idParam)

        this.playersService.getPerson(idParam)
          .subscribe(
            data => {
              console.log("PersonDetailComponent.ngOnInit: data: " + JSON.stringify(data))
              var person = (data as any).person
              this.id = person.id
              this.personDetailForm.setValue({
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
    console.log(this.personDetailForm.value);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.personDetailForm.invalid) {
      console.log("PersonDetailComponent.onSubmit(): personDetailForm is invalid");
      return;
    }

    this.playersService.updatePerson(this.id, this.personDetailForm.value)
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
          this.location.back();
        }
      )
  }

  onCancel(): void {
    console.log("PersonDetailComponent.onCancel(): ");
    this.location.back();
  }

  getFirstNameErrorMessage() {
    if (this.firstname.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getLastNameErrorMessage() {
    if (this.lastname.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.email.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }

  getKnownAsErrorMessage() {
    if (this.knownas.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getPhoneErrorMessage() {
    if (this.phone.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.phone.hasError('pattern')) {
      return 'Not a valid phone number';
    }

    console.log("PersonDetail.Component:" + JSON.stringify(this.phone.errors))

    return '';
  }

  getStatusErrorMessage() {
    if (this.status.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
