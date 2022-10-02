import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MyMaterialModule } from '../utilities/mymaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertButtonsComponent } from './alertbuttons/alertbuttons';
import { AlertsComponent } from './alert/alerts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MyMaterialModule,
        FormsModule
    ],
    declarations: [
        AlertsComponent,
        AlertButtonsComponent
    ],
    exports: [
        AlertsComponent,
        AlertButtonsComponent
    ]
})
export class AlertsModule { }