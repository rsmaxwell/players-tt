import { Component } from '@angular/core';
import { PersonFilter } from 'src/app/models/personfilter';

@Component({
  selector: 'app-people.page',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss']
})
export class PeoplePageComponent {

  pagename = 'People';
  filter!: PersonFilter; 

  handleFilterEvent(param: PersonFilter) {
    // console.log("PeoplePage.handleFilterEvent(): " + JSON.stringify(param))
    this.filter = param
  }
}
