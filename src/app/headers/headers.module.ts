import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PlainFooterComponent } from './plainfooter/plainfooter';
import { PlainHeaderComponent } from './plainheader/plainheader';
import { FullHeaderComponent } from './fullheader/fullheader';
import { FullFooterComponent } from './fullfooter/fullfooter';

@NgModule({
  declarations: [
    PlainHeaderComponent,
    PlainFooterComponent,
    FullHeaderComponent,
    FullFooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    CommonModule,
    RouterModule
  ],
  exports: [
    PlainHeaderComponent,
    PlainFooterComponent,
    FullHeaderComponent,
    FullFooterComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class HeadersModule { }
