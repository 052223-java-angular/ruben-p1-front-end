import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RegisterPayload} from "../models/register-payload";
import {Observable} from "rxjs";
import {Auth} from "../models/auth";
import {UsersAllPayload} from "../models/users-all-payload";
import {ArmyPayload} from "../models/army-payload";
import { SessionService} from "./session.service";
import {UsernamePayload} from "../models/username-payload";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // set the base url
  baseurl = 'http://localhost:8080/api'
  constructor(private http: HttpClient,
              private sessionService: SessionService) { }

  getUsers(): Observable<UsersAllPayload[]>{
    return this.http.get<UsersAllPayload[]>(`${this.baseurl}/users/all`);
  }

  getUserArmy(): Observable<ArmyPayload>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", this.sessionService.username);

    return this.http.get<ArmyPayload>(`${this.baseurl}`+`/armies/` + this.sessionService.username);
  }

  sortAlpha(): Observable<UsersAllPayload[]>{
    return this.http.get<UsersAllPayload[]>(`${this.baseurl}/users/all`);
  }

  // authenticate token from stored session
  getAuth(): Auth | null {
    const auth = localStorage.getItem('auth');
    if (auth) { return JSON.parse(auth); }
    return null;
  }


}
