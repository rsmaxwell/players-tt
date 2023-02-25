import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CourtsPageComponent } from './courts/courts.page/courts.page';
import { CourtsListComponent } from './courts/courts.list/courts.list.component';

import { CourtPageComponent } from './court/court.page/court-page.component';
import { CourtItemComponent } from './courts/courts.item/court.item.component';
import { CourtDetailComponent } from './court/court.detail/courtdetail.component';

import { CreateCourtPageComponent } from './create/createcourt.page/createcourt-page.component';
import { CreateCourtComponent } from './create/createcourt.detail/createcourt.component';
import { AlertsModule } from 'src/app/alert/alerts.module';
import { HeadersModule } from 'src/app/headers/headers.module';


@NgModule({
  declarations: [
    CourtsPageComponent,
    CourtsListComponent,

    CourtPageComponent,
    CourtItemComponent,
    CourtDetailComponent,

    CreateCourtPageComponent,
    CreateCourtComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
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

    CreateCourtPageComponent,
    CreateCourtComponent,
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class CourtsModule { }
