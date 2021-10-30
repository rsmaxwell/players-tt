import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'persondetail-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  pagename = 'Person';

  constructor() { }

  ngOnInit(): void {
  }
}
