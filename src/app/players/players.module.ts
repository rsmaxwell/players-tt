import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { HeadersModule } from '../headers/headers.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PositionComponent } from './position/position.component';
import { PlayersPageComponent } from './page/players.page';
import { PlayersListComponent } from './list/players-list.component';
import { PlayersRowComponent } from './row/players.row.component';
import { PlayersItemComponent } from './item/players-item.component';
import { PlayersHeadingComponent } from './heading/players-heading.component';
import { AlertsModule } from '../alert/alerts.module';



@NgModule({
  declarations: [
    PlayersPageComponent,
    PlayersListComponent,
    PlayersRowComponent,
    PlayersItemComponent,
    PlayersHeadingComponent,
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
    HeadersModule,
    ScrollingModule

  ],
  exports: [
    PlayersPageComponent,
    PlayersListComponent,
    PlayersRowComponent,
    PlayersItemComponent,
    PlayersHeadingComponent,
    PositionComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class PlayersModule { }
