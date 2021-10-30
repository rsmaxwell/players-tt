import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { PlayersService } from 'src/app/service/players.service';

@Component({
    selector: 'players-list',
    templateUrl: './players.list.component.html',
    styleUrls: ['./players.list.component.scss'],
})
export class PlayersListComponent implements OnInit, OnDestroy {

    subscription!: Subscription
    courts: Court[] = [];

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
    ) { }

    ngOnDestroy(): void {
        console.log("PlayersListComponent.ngOnDestroy")
        this.subscription.unsubscribe()
    }

    ngOnInit(): void {
        this.subscription = this.playersService.getCourts()
            .subscribe(
                response => {
                    let payload = response.payload.toString()
                    let payload2 = payload
                    if (payload.length > 100) {
                        payload2 = payload.substring(0, 100) + "..."
                    }
                    console.log("PlayersListComponent.ngOnInit: response: " + payload2)
                    this.courts = JSON.parse(payload)
                    this.courts.forEach((court: Court) => {
                        console.log("PlayersListComponent.ngOnInit: response: court: " + JSON.stringify(this.courts))
                        Court.expand(court)
                    })
                },
                error => {
                    console.log("PlayersListComponent.ngOnInit: error: " + JSON.stringify(error))
                    this.alertService.error(error);
                },
                () => {
                    console.log("PlayersListComponent.ngOnInit: complete")
                }
            );
    }
}

