import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { AccountService } from 'src/app/account/account.service';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'accountdetail',
  templateUrl: './accountdetail.component.html',
  styleUrls: ['./accountdetail.component.scss']
})
export class AccountDetailComponent implements OnInit {

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
  ) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        var userID = this.accountService.userID

        this.playersService.getPerson(userID)
          .subscribe(
            person => {
              console.log("AccountDetailComponent.ngOnInit: data: " + JSON.stringify(person))

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
              console.log("AccountDetailComponent.ngOnInit: error: " + JSON.stringify(error))
              this.alertService.error(error)
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

    this.playersService.updatePerson(userID, this.form.value)
      .subscribe(
        data => {
          console.log("AccountDetailComponent.onSubmit: data: " + JSON.stringify(data))
        },
        error => {
          console.log("AccountDetailComponent.onSubmit: error: " + JSON.stringify(error))
          this.alertService.error(error)
        },
        () => {
          console.log("AccountDetailComponent.onSubmit: complete")
          this.router.navigate(["app/people"])
        }
      )
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
