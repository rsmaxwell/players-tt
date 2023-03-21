
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMqttServiceOptions, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { AlertService } from 'src/app/alert/alert/alert.service';

class RegisterResponse {
  accessToken!: string;
}

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnDestroy {

  submitted = false;
  show = false;
  subscription!: Subscription

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password = new FormControl('', [
    Validators.required
  ]);

  form = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }


  onSubmit(): void {
    console.log("SigninComponent.onSubmit")

    var email = this.form.value.email!
    var password = this.form.value.password!

    console.log("SigninComponent.onSubmit: email = " + email)
    console.log("SigninComponent.onSubmit: password = " + password)
    console.log("SigninComponent.onSubmit: this.form.invalid: " + this.form.invalid)

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    console.log("SigninComponent.onSubmit(entry): calling accountService.signin()")

    this.subscription = this.accountService.signin(email, password)
      .subscribe({
        next: (response: any) => {
          console.log("SigninComponent.onSubmit: response: " + response.payload.toString())

          let payload: any = JSON.parse(response.payload.toString())
          if (payload.status == '200') {
            console.log("SigninComponent.onSubmit: id:           " + payload.id)
            console.log("SigninComponent.onSubmit: accessToken:  " + payload.accessToken)
            console.log("SigninComponent.onSubmit: refreshToken: " + payload.refreshToken)
            console.log("SigninComponent.onSubmit: refreshDelta: " + payload.refreshDelta)

            this.accountService.userID = payload.id
            this.accountService.accessToken = payload.accessToken
            this.accountService.refreshToken = payload.refreshToken
            this.accountService.refreshDelta = payload.refreshDelta
            this.accountService.startRefreshTokenTimer()

            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          } else {
            console.log("SigninComponent.onSubmit: Failed")
            this.alertService.error(payload.message)
            console.log("SigninComponent.onSubmit: status:       " + payload.status)
            console.log("SigninComponent.onSubmit: message:      " + payload.message)
          }

          this.ngOnDestroy()
        },
        error: (err: any) => {
          console.log("SigninComponent.onSubmit: error: " + JSON.stringify(err))
          this.alertService.errorDump("Could not sign into server", err);
        },
        complete: () => {
          console.log("SigninComponent.onSubmit: complete")
        }
      })

      console.log("SigninComponent.onSubmit(exit)")
  }

  ngOnDestroy(): void {
    console.log("SigninComponent.ngOnDestroy")
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
