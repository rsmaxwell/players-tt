
import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
export class SigninComponent implements AfterViewInit {

  submitted = false;
  hide = true;

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password = new FormControl('', [
    Validators.required
  ]);

  signinForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngAfterViewInit(): void {
    // console.log("SigninComponent.ngAfterViewInit");
    // this.alertService.error('EMERGENCY!', { autoClose: false, keepAfterRouteChange: false } );
  }

  onSubmit(): void {
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }

    // console.log("SigninComponent.onSubmit()");
    // this.alertService.info("SigninComponent.onSubmit()", { autoClose: true, keepAfterRouteChange: true } );

    var email = this.signinForm.value.email
    var password = this.signinForm.value.password
    this.accountService.signin(email, password)
      .subscribe(
        response => {

          console.log("SigninComponent.onSubmit: response: " + JSON.stringify(response))
          this.accountService.setUserID(response.person.id)          
          this.accountService.setAccessToken(response.accessToken)
          this.accountService.setRefreshDelta(response.refreshDelta)
          this.accountService.startRefreshTokenTimer()

          // console.log("SigninComponent.onSubmit().next");
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

          // console.log("    returnUrl: " + returnUrl);
          this.router.navigateByUrl(returnUrl);
        },
        error => {
          console.log("SigninComponent.onSubmit: error: " + JSON.stringify(error))
          this.alertService.errorDump("Could not sign into server", error);
        }
      )
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
