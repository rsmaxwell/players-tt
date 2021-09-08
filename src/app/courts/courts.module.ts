import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsModule } from 'src/app/_alert';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { HeadersModule } from '../headers/headers.module';
import { AlertButtonsModule } from '../alertbuttons/alertbuttons.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CourtsPageComponent } from './page/courts.page';
import { CourtsListComponent } from './list/courts.list.component';
import { CourtRowComponent } from './row/court.row.component';
import { CourtItemComponent } from './item/court.item.component';
import { CourtHeadingComponent } from './heading/court-heading.component';
import { PositionComponent } from './position/position.component';



@NgModule({
  declarations: [
    CourtsPageComponent,
    CourtsListComponent,
    CourtRowComponent,
    CourtItemComponent,
    CourtHeadingComponent,
    PositionComponent
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
    AlertButtonsModule,
    HeadersModule,
    ScrollingModule

  ],
  exports: [
    CourtsPageComponent,
    CourtsListComponent,
    CourtRowComponent,
    CourtItemComponent,
    CourtHeadingComponent,
    PositionComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class CourtsModule { }
