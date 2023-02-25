import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { AccountService } from 'src/app/account/account.service';
import { Person } from 'src/app/model/person';
import { Subscription } from 'rxjs';

@Component({
  selector: 'accountdetail',
  templateUrl: './accountdetail.component.html',
  styleUrls: ['./accountdetail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {

  subscription_getPerson!: Subscription
  subscription_updatePerson!: Subscription
  submitted = false;
  hide = true;
  sub: any;

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
    private accountService: AccountService,
    private playersService: PlayersService,
    private alertService: AlertService
  ) { }

  ngOnDestroy(): void {
      console.log("AccountDetailComponent.ngOnDestroy()")

      if (this.subscription_getPerson != undefined) {
        this.subscription_getPerson.unsubscribe()
      }
  
      if (this.subscription_updatePerson != undefined) {
        this.subscription_updatePerson.unsubscribe()
      }    
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        var userID = this.accountService.userID

        this.subscription_getPerson = this.playersService.getPerson(userID)
          .subscribe(
            response => {
              let payload = response.payload.toString()
              let payload2 = payload
              if (payload.length > 100) {
                payload2 = payload.substring(0, 100) + "..."
              }
              console.log("AccountDetailComponent.ngOnInit: response: " + payload2)
              let object = JSON.parse(payload)

              if (!('status' in object)) {
                console.log("AccountDetailComponent.ngOnInit: Error: missing 'status' field in response")
                this.alertService.error("Unexpected response from server")
              }
              else if (object.status != 200) {
                console.log("AccountDetailComponent.ngOnInit: Error: bad status in response:" + object.status)
                this.alertService.error("Unexpected response from server")
              }
              else if (!('person' in object)) {
                console.log("AccountDetailComponent.ngOnInit: Error: missing 'person' field in response")
                this.alertService.error("Unexpected response from server")
              }
              else {
                let person = object.person
                // this.id = person.id

                delete person.id
                this.form.setValue(person)
              }
            }
          )
      },
      error => {
        console.log("AccountDetailComponent.ngOnInit: error: " + JSON.stringify(error))
        this.alertService.error(error)
      }
    )
  }

  onSubmit(): void {
    console.log("AccountDetailComponent.onSubmit(): ");
    console.log(this.form.value);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("AccountDetailComponent.onSubmit(): form is invalid");
      return;
    }

    var userID = this.accountService.userID

    var value: Person = Person.fromFormGroup(this.form)
    this.subscription_updatePerson = this.playersService.updatePerson(userID, value)
      .subscribe({
        next: (response: any) => {
          let payload = response.payload.toString()
          let payload2 = payload
          if (payload.length > 100) {
            payload2 = payload.substring(0, 100) + "..."
          }
          console.log("AccountDetailComponent.onSubmit: response: " + payload2)
          let object = JSON.parse(payload)

          if (!('status' in object)) {
            console.log("AccountDetailComponent.onSubmit: Error: missing 'status' field in response")
            this.alertService.error("Unexpected response from server")
          }
          else if (object.status != 200) {
            console.log("AccountDetailComponent.onSubmit: Error: bad status in response")
            this.alertService.error("Unexpected response from server")
          }
          else {
            console.log("AccountDetailComponent.onSubmit: ok")
            this.alertService.success("Saved")
          }
        },
        error: (err: any) => {
          console.log("AccountDetailComponent.onSubmit: error: " + JSON.stringify(err))
          this.alertService.error(err)
        },
        complete: () => {
          console.log("AccountDetailComponent.onSubmit: complete")
          this.router.navigate(["app/people"])
        }
      })
  }

  onCancel(): void {
    console.log("AccountDetailComponent.onCancel(): ");
    this.router.navigate(["app/people"])
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
