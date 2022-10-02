import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'settings-detail',
  templateUrl: './settings.detail.html',
  styleUrls: ['./settings.detail.scss']
})
export class SettingsDetailComponent implements OnInit, OnDestroy {

  submitted = false;
  hide = true;
  sub: any;
  id: any;

  name = new FormControl('', [
    Validators.required
  ])

  form = new FormGroup({
    name: this.name
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private location: Location
  ) { }


  ngOnDestroy(): void {
    console.log("SettingsDetailComponent.ngOnDestroy()")

  }
  
  ngOnInit(): void {
    console.log("SettingsDetailComponent.ngOnInit(): ");
  }

  onSubmit(): void {
    console.log("SettingsDetailComponent.onSubmit(): ");
  }

  onCancel(): void {
    console.log("SettingsDetailComponent.onCancel(): ");
  }

  onDelete(): void {
    console.log("SettingsDetailComponent.onDelete(): ");
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

    return '';
  }
}
