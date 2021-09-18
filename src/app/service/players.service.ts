import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Court } from 'src/app/models/court';
import { Person } from '../models/person';
import { Position } from '../models/position';
import { Waiter } from '../models/waiter';

interface Response {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private http: HttpClient
  ) { }

  newPerson(person: Person): Observable<Person> {
    console.log(person)
    return this.http.post<Person>(`${environment.apiUrl}/register`, person)
  }

  getPeople(filter: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.apiUrl}/people`, {
      params: {
        filter: filter
      }
    })
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/people/` + id)
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    var body = `{ "person": ` + JSON.stringify(person) + ` } `
    console.log(body)
    return this.http.put<Person>(`${environment.apiUrl}/people/` + id, body)
  }

  deletePerson(personid: string): Observable<Response> {
    console.log(personid)
    return this.http.delete<Response>(`${environment.apiUrl}/people/` + personid)
  }

  // ------------------------------------------------------------------------------------------
  
  getCourts(): Observable<Court[]> {
    return this.http.get<Court[]>(`${environment.apiUrl}/courts`)
  }

  getCourt(id: string): Observable<Court> {
    return this.http.get<Court>(`${environment.apiUrl}/courts/` + id)
  }

  newCourt(court: Court): Observable<Court> {
    var body = `{ "court": ` + JSON.stringify(court) + ` } `
    console.log("PlayersService.newCourt(): " + body)
    return this.http.post<Court>(`${environment.apiUrl}/newcourt`, body)
  }

  updateCourt(id: string, court: Court): Observable<Court> {
    var body = `{ "court": ` + JSON.stringify(court) + ` } `
    console.log("PlayersService.updateCourt(): " + body)
    return this.http.put<Court>(`${environment.apiUrl}/courts/` + id, body)
  }

  fillCourt(court: Court): Observable<Position[]> {
    const body = { junk: '' }
    return this.http.put<Position[]>(`${environment.apiUrl}/courts/fill/` + court.id, body)
  }

  clearCourt(court: Court): Observable<string> {
    const body = { junk: '' }
    return this.http.put<string>(`${environment.apiUrl}/courts/clear/` + court.id, body)
  }

  deleteCourt(courtid: string): Observable<Response> {
    console.log(courtid)
    return this.http.delete<Response>(`${environment.apiUrl}/courts/` + courtid)
  }

  // ------------------------------------------------------------------------------------------

  getWaiters(): Observable<Waiter[]> {
    return this.http.get<Waiter[]>(`${environment.apiUrl}/waiters`)
  }
}
