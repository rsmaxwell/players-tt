import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { PasswordStrength } from 'src/app/utilities/passwordStrength';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  submitted = false;
  hide = true;
  subscription!: Subscription

  firstname = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ])
  lastname = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  knownas = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20),
  ])
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern("\\+?[0-9 ]*"),
    Validators.maxLength(20),
  ])
  password = new FormControl('', [
    Validators.required,
    PasswordStrength.createValidator()
  ]);

  form = new FormGroup({
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    knownas: this.knownas,
    phone: this.phone,
    password: this.password
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService   
  ) { }


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
    if (formControl.hasError('passwordStrength')) {
      let key = formControl.errors!.passwordStrength
      return PasswordStrength.getErrorMessage(key)
    }

    return '';
  }

  onSubmit(): void {
    console.log("RegisterComponent.onSubmit()");
    console.log(this.form.value);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.subscription = this.accountService.register(this.form.value)
      .subscribe(
        response => {
          console.log("RegisterComponent.onSubmit: register: response: " + response.payload.toString())

          let payload: any = JSON.parse(response.payload.toString())
          if (payload.status == '200') {
            console.log("RegisterComponent.onSubmit: Success")
            this.router.navigateByUrl("app/people");
          } else {
            console.log("RegisterComponent.onSubmit: Failed")
            this.alertService.error(payload.message) 
            console.log("RegisterComponent.onSubmit: status: " + payload.status)
            console.log("RegisterComponent.onSubmit: message: " + payload.message)
          }

          this.ngOnDestroy()
        },
        error => {
          console.log("RegisterComponent.onSubmit: register: error: " + JSON.stringify(error))
          this.alertService.error(error.error.message);
        },
        () => {
          console.log("RegisterComponent.onSubmit: register: complete")
        }
      );
  }
  
  ngOnDestroy(): void {
    console.log("RegisterComponent.ngOnDestroy")
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
