import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'alertbuttons',
  templateUrl: './alertbuttons.html',
  styleUrls: ['./alertbuttons.scss']
})
export class AlertButtonsComponent implements OnInit {

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(public alertService: AlertService
    ) { }

  ngOnInit(): void {
  }

  myError() {

    let details = {
      "message": "Http failure response for http://localhost:4201/players-api/signin: 0 Unknown Error",
      "number": 123456,
      "string": "Fred Bloggs"
    }

    console.log("AlertButtonsComponent.myError: details: " + JSON.stringify(details))

    this.alertService.errorDump('Problem connecting to server', details)
  }
}
