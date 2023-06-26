import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RegisterPayload} from "../models/register-payload";
import {Observable} from "rxjs";
import {Auth} from "../models/auth";
import {UsersAllPayload} from "../models/users-all-payload";
import {ArmyPayload} from "../models/army-payload";
import { SessionService} from "./session.service";
import {UsernamePayload} from "../models/username-payload";
import {environment} from "../environments/environments";
import { StatsPayload} from "../models/returns/stats-payload";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  // set the base url
  //baseurl = 'http://localhost:8080/api'
  baseurl: string = environment.apiBaseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      Auth: sessionStorage.getItem('token') || ''
    })
  };

  constructor(private http: HttpClient,
              private sessionService: SessionService) { }

  getUsers(): Observable<UsersAllPayload[]>{
    console.log("Get all users hit")
    console.log(this.baseurl + `/users/all`)
    return this.http.get<UsersAllPayload[]>(this.baseurl+'/users/all');
  }

  getUser(username: string): Observable<UsersAllPayload> {
    let queryParams = new HttpParams().set('username', username)
    console.log(username);
    return this.http.get<UsersAllPayload>(`${this.baseurl}/users/`+ username, {params: queryParams});
  }

  getUserArmy(username: string): Observable<ArmyPayload>{
    //let queryParams = new HttpParams().set('username', sessionStorage.getItem('username')!)
    let queryParams = new HttpParams().set('username', username)
    return this.http.get<ArmyPayload>(`${this.baseurl}/armies/` + sessionStorage.getItem('user'), {params: queryParams})
  }

  // get by param
  getStats(username: string): Observable<StatsPayload> {
    //let queryParams: HttpParams = new HttpParams().set('username', username)
    console.log(`[Get stats process...] username:`+username+ `` )
    return this.http.get<StatsPayload>(`${this.baseurl}/stats/${username}`)
  }

  sortAlpha(): Observable<UsersAllPayload[]>{
    return this.http.get<UsersAllPayload[]>(`${this.baseurl}/users/all`)
  }

  // authenticate token from stored session
  getAuth(): Auth | null {
    const auth = localStorage.getItem('auth')
    if (auth) { return JSON.parse(auth); }
    return null;
  }


}
