import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPayload} from "../models/register-payload";
import {Observable} from "rxjs";
import {Auth} from "../models/auth";
import {UsersAllPayload} from "../models/users-all-payload";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // set the base url
  baseurl = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersAllPayload[]>{
    return this.http.get<UsersAllPayload[]>(`${this.baseurl}/users/all`);
  }

  sortAlpha(): Observable<UsersAllPayload[]>{
    return this.http.get<UsersAllPayload[]>(`${this.baseurl}/users/all`);
  }
}