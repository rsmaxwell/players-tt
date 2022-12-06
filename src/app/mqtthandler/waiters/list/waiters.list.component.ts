import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Waiter } from 'src/app/model/waiter';
import { PlayersService } from 'src/app/service/players.service';

@Component({
    selector: 'waiters-list',
    templateUrl: './waiters.list.component.html',
    styleUrls: ['./waiters.list.component.scss'],
})
export class WaiterListComponent implements OnInit {

    subscription!: Subscription
    waiters: Waiter[] = [];

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
    ) { }

    ngOnDestroy(): void {
        console.log("WaiterListComponent.ngOnDestroy()")
        this.subscription.unsubscribe()
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
                    console.log("WaiterListComponent.ngOnInit: response: " + payload2)
                    this.waiters = JSON.parse(payload)
                },
                error => {
                    console.log("WaiterListComponent.ngOnInit: error: " + JSON.stringify(error))
                    this.alertService.error(error);
                },
                () => {
                    console.log("WaiterListComponent.ngOnInit: complete")
                }
            );
    }

    onClick(waiter: Waiter) {
        console.log("WaiterListComponent.onClick(): param: " + JSON.stringify(waiter))
    }
}

