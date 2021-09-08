import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { PasswordStrength } from 'src/app/utilities/passwordStrength';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  submitted = false;
  hide = true;

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
  password = new FormControl('', [
    Validators.required,
    PasswordStrength.createValidator()
  ]);

  registerForm = new FormGroup({
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    knownas: this.knownas,
    password: this.password
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

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

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    var err = this.password.getError('passwordStrength')
    if (err != null) {
      return PasswordStrength.getErrorMessage(err);
    }
  }

  onSubmit(): void {
    console.log("RegisterComponent.onSubmit(): ");    
    console.log(this.registerForm.value);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.accountService.register(this.registerForm.value)
      .subscribe(
        response => {
          console.log("RegisterComponent.onSubmit: response: " + JSON.stringify(response))
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error => {
          console.log("RegisterComponent.onSubmit: error: " + JSON.stringify(error))
          this.alertService.error(error.message);
        },
        () => {
          console.log("RegisterComponent.onSubmit: complete")
        }
      );
  }
}
