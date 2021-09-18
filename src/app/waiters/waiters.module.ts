import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { HeadersModule } from '../headers/headers.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { WaitersPageComponent } from './page/waiters.page';
import { WaiterItemComponent } from './item/waiter.item.component';
import { WaiterListComponent } from './list/waiters.list.component';
import { AlertsModule } from '../alert/alerts.module';



@NgModule({
  declarations: [
    WaitersPageComponent,
    WaiterListComponent,
    WaiterItemComponent 
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
    WaitersPageComponent,
    WaiterListComponent, 
    WaiterItemComponent    
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class WaitersModule { }
