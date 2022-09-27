
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../model/person';
import { Register } from '../model/register';
import { Observable, Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Guid } from "guid-typescript";

class SigninResponse {
  message!: string;
  person!: Person;
  accessToken!: string;
  refreshDelta!: number;
}

class RefreshTokenResponse {
  accessToken!: string;
}

class RegisterResponse {
  message!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private subscription!: Subscription;
  public userID!: number;
  public accessToken!: string;
  public refreshToken!: string;
  public refreshDelta!: number;
  public requestTopic = "request"
  public replyTopic = Guid.create().toString();

  constructor(
    private router: Router,
    private mqtt: MqttService
  ) { }

  public signin(username: string, password: string): Observable<IMqttMessage> {
    console.log("AccountService.signin()");

    let observable: Observable<IMqttMessage> = this.mqtt.observe(this.replyTopic)

    let request = { replyTopic: this.replyTopic, command: "signin", data: { username: username, password: password } }
    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  public register(register: Register): Observable<IMqttMessage> {
    console.log("AccountService.register()");

    let observable: Observable<IMqttMessage> = this.mqtt.observe(this.replyTopic)

    let request = { replyTopic: this.replyTopic, command: "register", data: register }
    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  public signout() {
    console.log("AccountService.signout()");
    localStorage.removeItem('user');
    this.accessToken = '';
    this.router.navigate(['/account/signin']);
  }

  public refresh(): Observable<IMqttMessage> {
    console.log("AccountService.refresh()");

    let observable: Observable<IMqttMessage> = this.mqtt.observe(this.replyTopic)

    let request = { replyTopic: this.replyTopic, command: "refreshToken", data: { accessToken: this.accessToken, refreshToken: this.refreshToken } }
    
    console.log("AccountService.refresh: request: " + JSON.stringify(request))

    this.mqtt.unsafePublish(this.requestTopic, JSON.stringify(request));

    return observable
  }

  private refreshAccessToken() {
    return this.refresh()
      .subscribe(
        response => {
          let payload: any = JSON.parse(response.payload.toString())

          if ("status" in payload) {
            if (payload.status == "0") {
              console.log("AccountService.refreshAccessToken: response.payload.status is OK")
              console.log("AccountService.refreshAccessToken: payload: " + JSON.stringify(payload))
              console.log("AccountService.refreshAccessToken: accessToken: " + payload['accessToken']) 
              this.accessToken = payload.accessToken             
              this.startRefreshTokenTimer();              
            } else {
              console.log("response.payload.status is " + payload.status)
              console.log("AccountService.refreshToken(): error: " + JSON.stringify(payload)) 
            }
          } else {
            console.log("response.payload does not contain 'status'")
            console.log("AccountService.refreshToken(): payload: " + JSON.stringify(payload)) 
          }
        },
        error => {
          console.log("AccountService.refreshToken(): payload: " + JSON.stringify(error)) 
          this.signout()        
        },
        () => {
          console.log("AccountService.refreshToken(): complete")        
        }
      )
  }

  private timerID!: number;

  public startRefreshTokenTimer() {

    console.log("AccountService.startRefreshTokenTimer(): accessToken: " + this.accessToken)

    const jwtToken = JSON.parse(atob(this.accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (this.refreshDelta * 1000);

    if (timeout < 0) {
      console.log("AccountService.startRefreshTokenTimer(): timeout: *** EXPIRED ***")
    }
    else {
      console.log("AccountService.startRefreshTokenTimer(): timeout: " + timeout / 1000 + " seconds")

      window.clearTimeout(this.timerID)

      this.timerID = window.setTimeout(
        () => {
          this.refreshAccessToken()
        }, timeout);
    }
  }
}
