import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadersModule } from '../../headers/headers.module';
import { SigninComponent } from './signin/signin-detail/signin.component';
import { SigninPage } from './signin/signin-page/signin.page';
import { RegisterComponent } from './register/register-detail/register.component';
import { RegisterPage } from './register/register-page/register.page';
import { AlertsModule } from '../../alert/alerts.module';



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
    ReactiveFormsModule,
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
