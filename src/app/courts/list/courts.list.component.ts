import { Component, OnInit } from '@angular/core';
import { Court } from 'src/app/models/court';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'courts-list',
    templateUrl: './courts.list.component.html',
    styleUrls: ['./courts.list.component.scss'],
})
export class CourtsListComponent implements OnInit {

    courts: Court[] = [];

    options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
    ) { }

    ngOnInit(): void {
        this.playersService.getCourts()
            .subscribe(
                courts => {
                    console.log("CourtsListComponent.ngOnInit: next: " + JSON.stringify(courts))
                    this.courts = courts
                    this.courts.forEach((court: Court) => {
                        console.log("CourtsListComponent.ngOnInit: next: court: " + JSON.stringify(court))
                        Court.expand(court)
                    })
                },
                error => {
                    console.log("CourtsListComponent.ngOnInit: error: " + JSON.stringify(error))
                    this.alertService.error(error);
                }
            );
    }
}

