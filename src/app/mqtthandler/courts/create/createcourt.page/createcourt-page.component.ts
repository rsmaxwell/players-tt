import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'createcourt-page',
  templateUrl: './createcourt-page.component.html',
  styleUrls: ['./createcourt-page.component.scss']
})
export class CreateCourtPageComponent implements OnInit {

  pagename = 'New Court';

  constructor() { }

  ngOnInit(): void {
  }
}
