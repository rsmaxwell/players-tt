import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accountdetail-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  pagename = 'Account';

  constructor() { }

  ngOnInit(): void {
  }
}
