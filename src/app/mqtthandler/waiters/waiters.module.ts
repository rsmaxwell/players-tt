import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { WaitersPageComponent } from './page/waiters.page';
import { WaiterItemComponent } from './item/waiter.item.component';
import { WaiterListComponent } from './list/waiters.list.component';
import { MyMaterialModule } from 'src/app/utilities/mymaterial.module';
import { AlertsModule } from 'src/app/alert/alerts.module';
import { HeadersModule } from 'src/app/headers/headers.module';



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
