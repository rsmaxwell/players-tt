import { Component, OnInit } from '@angular/core';
import { Waiter } from 'src/app/models/waiter';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'waiters-list',
    templateUrl: './waiters.list.component.html',
    styleUrls: ['./waiters.list.component.scss'],
})
export class WaiterListComponent implements OnInit {

    waiters: Waiter[] = [];

    options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
    ) { }

    ngOnInit(): void {
        this.playersService.getWaiters()
            .subscribe(
                waiters => this.waiters = waiters,
                error => {
                    console.log("WaiterListComponent.ngOnInit: error: " + JSON.stringify(error))
                    this.alertService.error(error)
                }
            );
    }

    onClick(waiter: Waiter) {
        console.log("WaiterListComponent.onClick(): param: " + JSON.stringify(waiter))
    }
}

