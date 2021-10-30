import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { PersonFilter } from 'src/app/model/personfilter';

@Component({
  selector: 'app-people.page',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss']
})
export class PeoplePageComponent {

  pagename = 'People';
  filter!: PersonFilter; 

  constructor(
    public alertService: AlertService,
    private router: Router
  ) { }

  handleFilterEvent(param: PersonFilter) {
    this.filter = param
  }

  onClick(event: Event): void {
    console.log("PeoplePageComponent.onClick()")
    this.router.navigate(['/account/register']);
  }
}
