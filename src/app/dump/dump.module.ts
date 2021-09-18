import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { HeadersModule } from '../headers/headers.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DumpItemComponent } from './item/dump.item.component';
import { DumpPageComponent } from './page/dump.page';
import { AlertsModule } from '../alert/alerts.module';


@NgModule({
  declarations: [
    DumpPageComponent,
    DumpItemComponent
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
    DumpPageComponent,
    DumpItemComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class DumpModule { }
