import { Component, Input, OnInit, ViewChildren, AfterViewInit, QueryList, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    @ViewChildren(PositionEditComponent) children!: QueryList<PositionEditComponent>;
    @Input() court!: Court;
    @Input() dummyForm!: FormGroup;

    subscription!: Subscription
    waiters: Waiter[] = [];

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
        private sharedDataService: SharedDataService
    ) {
        console.log("GridEditComponent.constructor()")
    }

    ngOnInit(): void {
        this.subscription = this.playersService.getWaiters()
            .subscribe(
                response => {
                    let payload = response.payload.toString()
                    let payload2 = payload
                    if (payload.length > 100) {
                        payload2 = payload.substring(0, 100) + "..."
                    }
                    console.log("GridEditComponent.ngOnInit: response: " + payload2)
                    let object = JSON.parse(payload)

                    if (!('status' in object)) {
                        console.log("GridEditComponent.ngOnInit: Error: missing 'status' field in response")
                        this.alertService.error("Unexpected response from server")
                    }
                    else if (object.status != 200) {
                        console.log("GridEditComponent.ngOnInit: Error: bad status in response")
                        this.alertService.error("Unexpected response from server")
                    }
                    else if (!('listOfWaiters' in object)) {
                        console.log("GridEditComponent.ngOnInit: Error: missing 'listOfWaiters' field in response")
                        this.alertService.error("Unexpected response from server")
                    }
                    else {
                        this.waiters = object.listOfWaiters
                        console.log("GridEditComponent.ngOnInit: ok: waiters = " + JSON.stringify(this.waiters))

                        this.subscription.unsubscribe()
                    }
                },
                error => {
                    console.log("GridEditComponent.ngOnInit: error: " + JSON.stringify(error))
                    this.alertService.error(error);
                },
                () => {
                    console.log("GridEditComponent.ngOnInit: complete")
                }
            );
    }

    ngAfterViewInit() {
        console.log("GridEditComponent.ngAfterViewInit()")
    }

    ngOnDestroy(): void {
        console.log("GridEditComponent.ngOnDestroy()")
        this.subscription.unsubscribe()
    }
}