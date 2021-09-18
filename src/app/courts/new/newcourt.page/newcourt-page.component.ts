import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'newcourt-page',
  templateUrl: './newcourt-page.component.html',
  styleUrls: ['./newcourt-page.component.scss']
})
export class NewCourtPageComponent implements OnInit {

  pagename = 'New Court';

  constructor() { }

  ngOnInit(): void {
  }
}
