import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { HeadersModule } from '../headers/headers.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AlertsModule } from '../alert/alerts.module';

import { CourtsPageComponent } from './courts/courts.page/courts.page';
import { CourtsListComponent } from './courts/courts.list/courts.list.component';

import { CourtPageComponent } from './court/court.page/court-page.component';
import { CourtItemComponent } from './courts/courts.item/court.item.component';
import { CourtDetailComponent } from './court/court.detail/courtdetail.component';

import { NewCourtPageComponent } from './new/newcourt.page/newcourt-page.component';
import { NewCourtComponent } from './new/newcourt.detail/newcourt.component';


@NgModule({
  declarations: [
    CourtsPageComponent,
    CourtsListComponent,

    CourtPageComponent,
    CourtItemComponent,
    CourtDetailComponent,

    NewCourtPageComponent,
    NewCourtComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MyMaterialModule,
    CommonModule,
    AlertsModule,
    HeadersModule,
    ScrollingModule

  ],
  exports: [
    CourtsPageComponent,
    CourtsListComponent, 

    CourtPageComponent,
    CourtItemComponent,
    CourtDetailComponent,

    NewCourtPageComponent,
    NewCourtComponent,
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class CourtsModule { }
