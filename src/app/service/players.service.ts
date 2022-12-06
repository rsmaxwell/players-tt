import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Court } from 'src/app/model/court';
import { Person } from '../model/person';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Guid } from 'guid-typescript';
import { AccountService } from '../account/account.service';

interface Response {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService implements OnDestroy {
  public requestTopic = "request"

  constructor(
    private mqtt: MqttService,
    private accountService: AccountService,
  ) { }

  ngOnDestroy(): void {
    console.log("PlayersService.ngOnDestroy()");
  }

  getPeople2(filter: string): Observable<IMqttMessage> {
    console.log("PlayersService.getPeople()");
    let replyTopic = Guid.create().toString();

    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let request = { replyTopic: replyTopic, command: "getPeople", data: { accessToken: this.accountService.accessToken, filter: filter } }
    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  getPeople(filter: string): Observable<IMqttMessage> {
    console.log("PlayersService.getPeople()");
    return this.mqtt.observeRetained("getPeople/" + filter)
  }

  getPerson(id: number): Observable<IMqttMessage> {
    console.log("PlayersService.getPerson()");
    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = {}
    data.accessToken = this.accountService.accessToken
    data.id = +id

    let request = { replyTopic: replyTopic, command: "getPerson", data: data }
    console.log("PlayersService.getPerson(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  updatePerson(id: number, person: Person): Observable<IMqttMessage> {
    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = person
    data.accessToken = this.accountService.accessToken
    data.id = +id

    let request = { replyTopic: replyTopic, command: "updatePerson", data: data }
    console.log("PlayersService.updatePerson(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  deletePerson(personid: number): Observable<IMqttMessage> {
    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = {}
    data.accessToken = this.accountService.accessToken
    data.id = +personid

    let request = { replyTopic: replyTopic, command: "deletePerson", data: data }
    console.log("PlayersService.deletePerson(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  // ------------------------------------------------------------------------------------------

  public getCourts(): Observable<IMqttMessage> {
    console.log("PlayersService.getCourts()");
    return this.mqtt.observeRetained("getCourts")
  }

  getCourt(id: number): Observable<IMqttMessage> {
    console.log("PlayersService.getCourt()");
    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = {}
    data.accessToken = this.accountService.accessToken
    data.id = +id

    let request = { replyTopic: replyTopic, command: "getCourt", data: data }
    console.log("PlayersService.getCourt(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  createCourt(court: Court): Observable<IMqttMessage> {
    console.log("PlayersService.createCourt()")

    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = court
    data.accessToken = this.accountService.accessToken

    let request = { replyTopic: replyTopic, command: "createCourt", data: data }
    console.log("PlayersService.createCourt(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  updateCourt(id: string, court: Court): Observable<IMqttMessage> {
    console.log("PlayersService.updateCourt()");

    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = court
    data.accessToken = this.accountService.accessToken
    data.id = +id

    let request = { replyTopic: replyTopic, command: "updateCourt", data: data }
    console.log("PlayersService.updateCourt(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  updateGame(id: string, court: Court): Observable<IMqttMessage> {
    console.log("PlayersService.updateGame()");

    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = court
    data.accessToken = this.accountService.accessToken
    data.id = +id

    let request = { replyTopic: replyTopic, command: "updateGame", data: data }
    console.log("PlayersService.updateGame(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  fillCourt(court: Court): Observable<IMqttMessage> {
    console.log("PlayersService.fillCourt");
    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = {}
    data.accessToken = this.accountService.accessToken
    data.courtID = +court.id

    let request = { replyTopic: replyTopic, command: "fillCourt", data: data }
    console.log("PlayersService.fillCourt(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  clearCourt(court: Court): Observable<IMqttMessage> {
    console.log("PlayersService.clearCourt");
    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = {}
    data.accessToken = this.accountService.accessToken
    data.courtID = +court.id

    let request = { replyTopic: replyTopic, command: "clearCourt", data: data }
    console.log("PlayersService.clearCourt(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  deleteCourt(courtid: string): Observable<IMqttMessage> {
    console.log("PlayersService.deleteCourt()");
    let replyTopic = Guid.create().toString();
    let observable: Observable<IMqttMessage> = this.mqtt.observe(replyTopic)

    let data: any = {}
    data.accessToken = this.accountService.accessToken
    data.id = +courtid

    let request = { replyTopic: replyTopic, command: "deleteCourt", data: data }
    console.log("PlayersService.deleteCourt(): request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  // ------------------------------------------------------------------------------------------

  getWaiters(): Observable<IMqttMessage> {
    console.log("PlayersService.getWaiters()");
    return this.mqtt.observeRetained("getWaiters")
  }
}
