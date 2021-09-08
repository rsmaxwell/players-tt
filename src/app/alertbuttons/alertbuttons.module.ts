import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { AlertButtonsComponent } from './alertbuttons';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlertButtonsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MyMaterialModule
  ],
  exports: [
    AlertButtonsComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class AlertButtonsModule { }
