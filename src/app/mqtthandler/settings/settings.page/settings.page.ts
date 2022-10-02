import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPageComponent implements OnInit {

  pagename = 'Settings';

  ngOnInit(): void {
  }

}
