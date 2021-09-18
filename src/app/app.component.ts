import { Component } from '@angular/core';
import { AlertService } from './alert/alert/alert.service';
import { MessageService } from './dump/service/message.service';

@Component({ 
    selector: 'app', 
    templateUrl: 'app.component.html',
    providers: [MessageService],
})
export class AppComponent {
  title = "Players"
  options = {
    autoClose: false,
    keepAfterRouteChange: false
};

  constructor(public alertService: AlertService) { }
}