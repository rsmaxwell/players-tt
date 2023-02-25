import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'persondetail',
  templateUrl: './persondetail.component.html',
  styleUrls: ['./persondetail.component.scss']
})
export class PersonDetailComponent implements OnInit, OnDestroy {

  subscription_getPerson!: Subscription
  subscription_updatePerson!: Subscription
  subscription_deletePerson!: Subscription
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
    private alertService: AlertService
  ) { }

  ngOnDestroy(): void {
    console.log("PersonDetailComponent.ngOnDestroy()")
    if (this.subscription_getPerson != undefined) {
      this.subscription_getPerson.unsubscribe()
    }

    if (this.subscription_updatePerson != undefined) {
      this.subscription_updatePerson.unsubscribe()
    }

    if (this.subscription_deletePerson != undefined) {
      this.subscription_deletePerson.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        var idParam = params['id'];

        // console.log("PersonDetailComponent.ngOnInit: idParam: " + idParam)

        this.subscription_getPerson = this.playersService.getPerson(idParam)
          .subscribe(
            response => {
              let payload = response.payload.toString()
              let payload2 = payload
              if (payload.length > 100) {
                payload2 = payload.substring(0, 100) + "..."
              }
              console.log("PersonDetailComponent.ngOnInit: response: " + payload2)
              let object = JSON.parse(payload)

              if (!('status' in object)) {
                console.log("PersonDetailComponent.ngOnInit: Error: missing 'status' field in response")
                this.alertService.error("Unexpected response from server")
              }
              else if (object.status != 200) {
                console.log("PersonDetailComponent.ngOnInit: Error: bad status in response" + object.status)
                this.alertService.error("Unexpected response from server")
              }
              else if (!('person'! in object)) {
                console.log("PersonDetailComponent.ngOnInit: Error: missing 'person' field in response")
                this.alertService.error("Unexpected response from server")
              }
              else {
                let person = object.person

                console.log("PersonDetailComponent.ngOnInit: person.status: " + person.status)

                console.log("PersonDetailComponent.ngOnInit: statuses: " + this.statuses)
                this.statuses.forEach((item: string) => {
                  console.log("PersonDetailComponent.ngOnInit:       " + item) 
                });


                this.id = person.id

                delete person.id
                this.form.setValue(person)
              }
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

    var value: Person = Person.fromFormGroup(this.form)
    this.subscription_updatePerson = this.playersService.updatePerson(this.id, value)
      .subscribe({
        next: (response: any) => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("PersonDetailComponent.ngOnInit: response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("PersonDetailComponent.ngOnInit: Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 200) {
            console.log("PersonDetailComponent.ngOnInit: Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("PersonDetailComponent.onSubmit: ok")
            this.router.navigate(["app/people"])
          }
        },
        error: (err: any) => {
          console.log("PersonDetailComponent.onSubmit: error: " + JSON.stringify(err))
          this.alertService.error(err)
        },
        complete: () => {
          console.log("PersonDetailComponent.onSubmit: complete")
          this.router.navigate(["app/people"])
        }
      })
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

    this.subscription_deletePerson = this.playersService.deletePerson(this.id)
      .subscribe({
        next: (response: any) => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("PersonDetailComponent.onDelete(): response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("PersonDetailComponent..onDelete(): Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 200) {
            console.log("PersonDetailComponent..onDelete(): Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("PersonDetailComponent..onDelete(): ok")
            this.router.navigate(["app/people"])
          }
        },
        error: (err: any) => {
          console.log("PersonDetailComponent..onDelete(): error: " + JSON.stringify(err))
          this.alertService.error(err)
        },
        complete: () => {
          console.log("PersonDetailComponent..onDelete(): complete")
          this.router.navigate(["app/people"])
        }
      })
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
    if (formControl.hasError('email')) {
      return "Not a valid email address";
    }
    if (formControl.hasError('pattern')) {
      return "Not a valid phone number";
    }

    return '';
  }

}
