import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsComponent } from './alerts.component';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MyMaterialModule
    ],
    declarations: [AlertsComponent],
    exports: [AlertsComponent]
})
export class AlertsModule { }