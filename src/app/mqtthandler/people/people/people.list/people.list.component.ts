import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Person } from 'src/app/model/person';
import { PersonFilter } from 'src/app/model/personfilter';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Subscription } from 'rxjs';



@Component({
    selector: 'peoplelist',
    templateUrl: './people.list.component.html',
    styleUrls: ['./people.list.component.scss']
})
export class PeopleListComponent implements OnChanges, OnDestroy {

    subscription_getPeople!: Subscription
    people: Person[] = [];
    @Input() filter!: PersonFilter;

    constructor(
        public alertService: AlertService,
        private playersService: PlayersService,
        private router: Router
    ) { }

    ngOnDestroy(): void {
        console.log("PeopleListComponent.ngOnDestroy()")

        if (this.subscription_getPeople != undefined) {
            this.subscription_getPeople.unsubscribe()
        }
    }

    ngOnChanges(): void {
        console.log("PeopleListComponent.ngOnChanges()")
        if (this.subscription_getPeople != undefined) {
            this.subscription_getPeople.unsubscribe()
        }

        this.subscription_getPeople = this.playersService.getPeople(this.filter.id)
            .subscribe(
                response => {
                    let payload = response.payload.toString()
                    let payload2 = payload
                    if (payload.length > 100) {
                        payload2 = payload.substring(0, 100) + "..."
                    }
                    console.log("PeopleListComponent.ngOnChanges: response: " + payload2)
                    this.people = JSON.parse(payload)
                },
                error => {
                    console.log("PeopleListComponent.ngOnChanges: error: " + error)
                    this.alertService.error(error)
                },
                () => {
                    console.log("PeopleListComponent.ngOnChanges: complete")
                }
            );
    }

    onClick(person: Person) {
        console.log("PeopleListComponent.onClick(): param: " + JSON.stringify(person))
        this.router.navigate(['app/people', person.id]);
    }
}
