import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../../utilities/mymaterial.module';
import { HeadersModule } from '../../headers/headers.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertsModule } from '../../alert/alerts.module';
import { Viewer } from './viewer/viewer';



@NgModule({
  declarations: [
    Viewer
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
    Viewer
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class ViewerModule { }
