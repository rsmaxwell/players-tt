import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { PlayersService } from 'src/app/service/players.service';

@Component({
    selector: 'games-list',
    templateUrl: './list.html',
    styleUrls: ['./list.scss'],
})
export class GamesListComponent implements OnInit, OnDestroy {

    subscription!: Subscription
    courts: Court[] = [];

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
    ) { }

    ngOnDestroy(): void {
        console.log("GamesListComponent.ngOnDestroy")
        this.subscription.unsubscribe()
    }

    ngOnInit(): void {

        console.log("games-view/list");

        this.subscription = this.playersService.getCourts()
            .subscribe({
                next: (response: any) => {
                    let payload = response.payload.toString()
                    let payload2 = payload
                    if (payload.length > 100) {
                        payload2 = payload.substring(0, 100) + "..."
                    }
                    console.log("GamesListComponent.ngOnInit: response: " + payload2)
                    this.courts = JSON.parse(payload)
                    this.courts.forEach((court: Court) => {
                        console.log("GamesListComponent.ngOnInit: response: court: " + JSON.stringify(this.courts))
                        Court.expand(court)
                    })
                },
                error: (err: any) => {
                    console.log("GamesListComponent.ngOnInit: error: " + JSON.stringify(err))
                    this.alertService.error(err);
                },
                complete: () => {
                    console.log("GamesListComponent.ngOnInit: complete")
                }
            });
    }
}

