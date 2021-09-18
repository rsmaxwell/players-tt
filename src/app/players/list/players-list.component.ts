import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/models/court';
import { PlayersService } from 'src/app/service/players.service';

@Component({
    selector: 'players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent implements OnInit {

    courts: Court[] = [];

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
    ) { }

    ngOnInit(): void {
        this.playersService.getCourts()
            .subscribe(
                courts => {
                    console.log("PlayersListComponent.ngOnInit: next: " + JSON.stringify(courts))
                    this.courts = courts
                    this.courts.forEach((court: Court) => {
                        console.log("PlayersListComponent.ngOnInit: next: court: " + JSON.stringify(court))
                        Court.expand(court)
                    })
                },
                error => {
                    console.log("PlayersListComponent.ngOnInit: error: " + JSON.stringify(error))
                    this.alertService.error(error);
                }
            );
    }
}

