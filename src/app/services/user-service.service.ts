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
    return this.http.get<UsersAllPayload[]>(`${this.baseurl}/users/all`)
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
  getArmy(username: string) {
    let queryParams: HttpParams = new HttpParams().set('username', username)
    console.log(`hitting new get other users army`)
    return this.http.get(`${this.baseurl}armies/${username}`)
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
