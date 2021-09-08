import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonFilter } from 'src/app/models/personfilter';
import { AlertService } from 'src/app/_alert';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';



@Component({
  selector: 'peoplelist',
  templateUrl: './people.list.component.html',
  styleUrls: ['./people.list.component.scss']
})
export class PeopleListComponent implements OnChanges {

  people: Person[] = [];

  @Input() filter!: PersonFilter;

  constructor(
    public alertService: AlertService,
    private playersService: PlayersService,
    private router: Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("PeopleListComponent.ngOnChanges(): changes: " + JSON.stringify(changes))
    this.playersService.getPeople(this.filter.id).subscribe(
      people => this.people = people,
      error => {
        console.log("PeopleListComponent.ngOnChanges: error: " + JSON.stringify(error))
        this.alertService.error(error.Error);
      });
  }

  onClick(person: Person) {
    console.log("PeopleListComponent.onClick(): param: " + JSON.stringify(person))
    this.router.navigate(['app/people', person.id]);
  }
}
