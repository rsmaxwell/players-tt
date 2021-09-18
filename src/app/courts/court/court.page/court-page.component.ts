import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'court-page',
  templateUrl: './court-page.component.html',
  styleUrls: ['./court-page.component.scss']
})
export class CourtPageComponent implements OnInit {

  pagename = 'Court';

  constructor() { }

  ngOnInit(): void {
  }
}
