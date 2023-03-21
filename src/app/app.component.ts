import { Component } from '@angular/core';
import { IMqttServiceOptions, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { AlertService } from './alert/alert/alert.service';
import { MessageService } from './dump/service/message.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [MessageService],
})
export class AppComponent {
  title = 'Players'
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  static map = new Map([
    [0, "No Error"],
    [1, "Connection Refused: Unacceptable protocol version"],
    [3, "Connection Refused: Server Unavailable"],
    [4, "Connection Refused: Bad username or password"],
    [5, "Connection Refused: Authorization error"],
    [6, "Connection lost or bad"],
    [7, "Timeout waiting for Length bytes"],
    [8, "Timeout waiting for Payload"],
    [9, "Timeout waiting for CONNACK"],
    [10, "Timeout waiting for SUBACK"],
    [11, "Timeout waiting for UNSUBACK"],
    [12, "Timeout waiting for PINGRESP"],
    [13, "Malformed Remaining Length"],
    [14, "Problem with the underlying communication port"],
    [15, "Address could not be parsed"],
    [16, "Malformed received MQTT packet"],
    [17, "Subscription failure"],
    [18, "Payload decoding failure"],
    [19, "Failed to compile a Decoder"],
    [20, "The received MQTT packet type is not supported on this client"],
    [21, "Timeout waiting for PUBACK"],
    [22, "Timeout waiting for PUBREC"],
    [23, "Timeout waiting for PUBCOMP"],
  ])


  constructor(
    public alertService: AlertService
  ) { }


}
