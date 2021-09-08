import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Court } from 'src/app/models/court';
import { Person } from '../models/person';
import { Position } from '../models/position';
import { Waiter } from '../models/waiter';

interface Response {
  message: string
}

interface FillCourtResponse {
  message: string
  positions: Position[]
}

interface ClearCourtResponse {
  message: string
}


interface ListWaitersResponse {
  message: string
  waiters: number[]
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private http: HttpClient
  ) { }

  getPeople(filter: string): Observable<Person[]> {
    return this.http.post<Person[]>(`${environment.apiUrl}/people`, `{ "filter": "` + filter + `" } `)
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/people/` + id)
  }

  updatePerson(id: string, person: Person): Observable<Person> {
    var body = `{ "person": ` + JSON.stringify(person) + ` } `
    console.log(body)
    return this.http.put<Person>(`${environment.apiUrl}/people/` + id, body)
  }

  getCourts(): Observable<Court[]> {
    return this.http.get<Court[]>(`${environment.apiUrl}/courts`)
  }

  getCourt(id: string): Observable<Court> {
    return this.http.get<Court>(`${environment.apiUrl}/courts/` + id)
  }

  updateCourt(id: string, court: Court): Observable<Court> {
    var body = `{ "court": ` + JSON.stringify(court) + ` } `
    console.log(body)
    return this.http.put<Court>(`${environment.apiUrl}/court/` + id, body)
  }

  fillCourt(court: Court): Observable<FillCourtResponse> {
    const body = { junk: '' }
    return this.http.put<FillCourtResponse>(`${environment.apiUrl}/courts/fill/` + court.id, body)
  }

  clearCourt(court: Court): Observable<ClearCourtResponse> {
    const body = { junk: '' }
    return this.http.put<ClearCourtResponse>(`${environment.apiUrl}/courts/clear/` + court.id, body)
  }

  getWaiters(): Observable<Waiter[]> {
    return this.http.get<Waiter[]>(`${environment.apiUrl}/waiters`)
  }
}
