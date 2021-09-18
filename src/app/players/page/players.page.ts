import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'players-page',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss']
})
export class PlayersPageComponent implements OnInit {

  pagename = 'Players';

  ngOnInit(): void {
  }
}
