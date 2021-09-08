import { Component } from '@angular/core';
import { MessageService } from './dump/service/message.service';
import { AlertService } from './_alert';

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