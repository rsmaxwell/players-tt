import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'courts-page',
  templateUrl: './courts.page.html',
  styleUrls: ['./courts.page.scss']
})
export class CourtsPageComponent implements OnInit {

  pagename = 'Courts';

  ngOnInit(): void {
  }

}
