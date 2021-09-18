import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { HeadersModule } from '../headers/headers.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SigninComponent } from './signin/signin.component';
import { SigninPage } from './signin-page/signin.page';
import { RegisterComponent } from './register/register.component';
import { RegisterPage } from './register-page/register.page';
import { AlertsModule } from '../alert/alerts.module';



@NgModule({
  declarations: [
    SigninComponent,
    SigninPage,
    RegisterComponent,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MyMaterialModule,
    CommonModule,
    RouterModule,
    AlertsModule,
    HeadersModule
  ],
  exports: [
    SigninComponent,
    SigninPage,
    RegisterComponent,
    RegisterPage
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class AuthorisationModule { }
