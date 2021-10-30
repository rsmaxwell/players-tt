import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { PlayersService } from 'src/app/service/players.service';

@Component({
    selector: 'courts-list',
    templateUrl: './courts.list.component.html',
    styleUrls: ['./courts.list.component.scss'],
})
export class CourtsListComponent implements OnInit, OnDestroy {

    subscription_getCourts!: Subscription
    courts: Court[] = [];

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
        private router: Router
    ) { }

    ngOnDestroy(): void {
        console.log("CourtsListComponent.ngOnDestroy()")
        this.subscription_getCourts.unsubscribe()
    }

    ngOnInit(): void {
        console.log("CourtsListComponent.ngOnInit()")

        this.subscription_getCourts = this.playersService.getCourts()
            .subscribe(
                response => {
                    let payload = response.payload.toString()
                    let payload2 = payload
                    if (payload.length > 100) {
                        payload2 = payload.substring(0, 100) + "..."
                    }
                    console.log("CourtsListComponent.ngOnInit: response: " + payload2)
                    this.courts = JSON.parse(payload)
                },
                error => {
                    console.log("CourtsListComponent.ngOnInit: error: " + error)
                    this.alertService.error(error)
                },
                () => {
                    console.log("CourtsListComponent.ngOnInit: complete")
                }
            );
    }

    onClick(court: Court) {
        console.log("CourtListComponent.onClick(): param: " + JSON.stringify(court))
        this.router.navigate(['app/courts', court.id]);
    }
}

