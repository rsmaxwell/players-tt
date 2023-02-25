import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PositionViewComponent } from './position/position';
import { GamesListComponent } from './list/list';
import { GameViewComponent } from './game/game';
import { GridViewComponent } from './grid/grid';
import { GridViewHeadingComponent } from './heading/heading';
import { AlertsModule } from 'src/app/alert/alerts.module';
import { HeadersModule } from 'src/app/headers/headers.module';
import { GamesViewPageComponent } from './page/page';



@NgModule({
  declarations: [
    GamesViewPageComponent,
    GamesListComponent,
    GameViewComponent,
    GridViewComponent,
    GridViewHeadingComponent,
    PositionViewComponent
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
    GamesViewPageComponent,
    GamesListComponent,
    GameViewComponent,
    GridViewComponent,
    GridViewHeadingComponent,
    PositionViewComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class GamesViewModule { }
