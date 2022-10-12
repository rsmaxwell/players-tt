import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'games-view-page',
  templateUrl: './page.html',
  styleUrls: ['./page.scss']
})
export class GamesViewPageComponent implements OnInit {

  pagename = 'Games';

  ngOnInit(): void {
    console.log("GamesViewPageComponent.ngOnInit")
  }
}
