import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AlertsModule } from 'src/app/alert/alerts.module';
import { HeadersModule } from 'src/app/headers/headers.module';
import { GameEditPageComponent } from './page/page';
import { PositionEditComponent } from './position/position';
import { GridEditComponent } from './grid/grid';
import { GameEditComponent } from './game/game';
import { GridEditHeadingComponent } from './heading/heading';

@NgModule({
  declarations: [
    GameEditPageComponent,
    GameEditComponent,
    GridEditComponent,
    PositionEditComponent,
    GameEditComponent,
    GridEditHeadingComponent
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
    GameEditPageComponent,
    GameEditComponent,
    GridEditComponent,
    PositionEditComponent,
    GameEditComponent,
    GridEditHeadingComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class GameEditModule { }
