import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertButtonsComponent } from './alertbuttons/alertbuttons';
import { AlertsComponent } from './alert/alerts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
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