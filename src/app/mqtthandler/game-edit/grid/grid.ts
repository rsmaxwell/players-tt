import { Component, Input, OnInit, ViewChildren, AfterViewInit, QueryList, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { Waiter } from 'src/app/model/waiter';
import { SharedDataService } from 'src/app/service/game.service';
import { PlayersService } from 'src/app/service/players.service';
import { PositionEditComponent } from '../position/position';

@Component({
    selector: 'grid-edit',
    templateUrl: './grid.html',
    styleUrls: ['./grid.scss']
})
export class GridEditComponent implements OnInit, AfterViewInit {

    @ViewChildren(PositionEditComponent) positions!: QueryList<PositionEditComponent>;
    @Input() court!: Court;

    subscription!: Subscription
    waiters: Waiter[] = [];

    @Input() formGroup2: FormGroup;

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
		private fb: FormBuilder,
        private sharedDataService: SharedDataService
    ) {
        console.log("GridEditComponent.constructor()")

        this.formGroup2 = this.fb.group({
			positions: this.fb.array([])
		})
    }

    ngOnInit(): void {
        console.log("GridEditComponent.ngOnInit(1): court: " + JSON.stringify(this.court))

        console.log("GridEditComponent.ngOnInit(2): positions: " + JSON.stringify(this.court.positions))

        this.subscription = this.playersService.getWaiters()
            .subscribe({
                next: (response: any) => {
                    let payload = response.payload.toString()
                    let payload2 = payload
                    if (payload.length > 100) {
                        payload2 = payload.substring(0, 100) + "..."
                    }
                    console.log("GridEditComponent.ngOnInit: response: " + payload2)
                    this.waiters = JSON.parse(payload)
                    console.log("GridEditComponent.ngOnInit: ok: waiters = " + JSON.stringify(this.waiters))
                    this.subscription.unsubscribe()
                },
                error: (err: any) => {
                    console.log("GridEditComponent.ngOnInit: error: " + JSON.stringify(err))
                    this.alertService.error(err);
                },
                complete() {
                    console.log("GridEditComponent.ngOnInit: complete")
                }
        });
    }

    ngAfterViewInit() {
        console.log("GridEditComponent.ngAfterViewInit()")       
    }

    ngOnDestroy(): void {
        console.log("GridEditComponent.ngOnDestroy()")
        if (this.subscription != null) {
            this.subscription.unsubscribe()
        }
    }
}
