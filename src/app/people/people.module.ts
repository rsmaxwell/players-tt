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
import { PeopleListComponent } from './people.list/people.list.component';
import { PeoplePageComponent } from './people.page/people.page';
import { PeopleFilterComponent } from './people.filter/peoplefilter.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PersonPageComponent } from './person.page/person-page.component';
import { PersonDetailComponent } from './person.detail/persondetail.component';
import { PersonItemComponent } from './person.item/person.item.component';


@NgModule({
  declarations: [
    PeopleListComponent,
    PeoplePageComponent,
    PeopleFilterComponent,
    PersonPageComponent,
    PersonDetailComponent,
    PersonItemComponent
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
    PersonItemComponent,
    PersonDetailComponent,
    PeopleListComponent,
    PeoplePageComponent,
    PeopleFilterComponent,
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class PeopleModule { }
