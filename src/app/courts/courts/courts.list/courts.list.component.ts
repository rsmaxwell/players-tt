import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/models/court';
import { PlayersService } from 'src/app/service/players.service';

@Component({
    selector: 'courts-list',
    templateUrl: './courts.list.component.html',
    styleUrls: ['./courts.list.component.scss'],
})
export class CourtsListComponent implements OnInit {

    courts: Court[] = [];

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log("CourtsListComponent.ngOnInit()")

        this.playersService.getCourts()
            .subscribe(
                courts => {
                    console.log("CourtsListComponent.ngOnInit: courts: " + JSON.stringify(courts))
                    this.courts = courts
                },
                error => {
                    console.log("CourtsListComponent.ngOnInit: error: " + JSON.stringify(error))
                    this.alertService.error(error.message)
                }
            );
    }

    onClick(court: Court) {
        console.log("CourtListComponent.onClick(): param: " + JSON.stringify(court))
        this.router.navigate(['app/courts', court.id]);
    }
}

