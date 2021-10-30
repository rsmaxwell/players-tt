
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  hide = true;
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

    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    var email = this.form.value.email
    var password = this.form.value.password
    this.subscription = this.accountService.signin(email, password)
      .subscribe(
        response => {
          let payload: any = JSON.parse(response.payload.toString())
          console.log("SigninComponent.onSubmit: response: " + response.payload.toString())
          console.log("SigninComponent.onSubmit: id:           " + payload.id)
          console.log("SigninComponent.onSubmit: accessToken:  " + payload.accessToken)
          console.log("SigninComponent.onSubmit: refreshDelta: " + payload.refreshDelta)
          this.accountService.setUserID(payload.id)
          this.accountService.setAccessToken(payload.accessToken)
          this.accountService.setRefreshDelta(payload.refreshDelta)
          this.accountService.startRefreshTokenTimer()
          
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error => {
          console.log("SigninComponent.onSubmit: error: " + JSON.stringify(error))
          this.alertService.errorDump("Could not sign into server", error);
        },
        () => {
          console.log("SigninComponent.onSubmit: complete")
        }
      )
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
