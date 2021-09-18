import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';
import { Register } from '../models/register';
import { BehaviorSubject, Observable } from 'rxjs';

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
  public userID!: number;
  public accessToken!: string;
  public refreshDelta!: number;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public signin(username: string, password: string): Observable<SigninResponse> {
    var signinRequest = { signin: { username: username, password: password } }
    return this.http.post<SigninResponse>(`${environment.apiUrl}/signin`, signinRequest, { withCredentials: true })
  }

  public register(register: Register) {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/register`, register);
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public setRefreshDelta(delta: number) {
    this.refreshDelta = delta;
  }

  
  setUserID(id: number) {
    this.userID = id;
  }

  public signout() {
    localStorage.removeItem('user');
    this.accessToken = '';
    this.router.navigate(['/account/signin']);
  }

  private refreshToken() {
    return this.http.post<RefreshTokenResponse>(`${environment.apiUrl}/refresh`, {}, { withCredentials: true })
      .subscribe(
        response => {
          this.accessToken = response.accessToken
          this.startRefreshTokenTimer();
        },
        error => {
          console.log("AccountService.refreshToken(): error: " + JSON.stringify(error)) 
          this.signout()        
        }
      )
  }

  private timerID!: number;

  public startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (this.refreshDelta * 1000);

    if (timeout < 0) {
      console.log("AccountService.startRefreshTokenTimer(): timeout: *** EXPIRED ***")
    }
    else {
      console.log("AccountService.startRefreshTokenTimer(): timeout: " + timeout / 1000 + " seconds")
      this.timerID = window.setTimeout(
        () => {
          this.refreshToken()
        }, timeout);
    }
  }
}
