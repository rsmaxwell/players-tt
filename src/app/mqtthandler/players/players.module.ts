import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PositionComponent } from './position/position.component';
import { PlayersPageComponent } from './page/players.page';
import { PlayersListComponent } from './list/players.list.component';
import { PlayersRowComponent } from './row/players.row.component';
import { PlayersItemComponent } from './item/players.item.component';
import { PlayersHeadingComponent } from './heading/players.heading.component';
import { MyMaterialModule } from 'src/app/utilities/mymaterial.module';
import { AlertsModule } from 'src/app/alert/alerts.module';
import { HeadersModule } from 'src/app/headers/headers.module';



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
