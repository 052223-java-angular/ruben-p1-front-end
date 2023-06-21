import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPayload} from "../models/register-payload";
import {Observable} from "rxjs";
import {Auth} from "../models/auth";
import {LoginPayload} from "../models/login-payload";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // set the base url
  baseurl = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  // takes front end inputs and sends DTO to backend with register input
  register(payload: RegisterPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseurl}/auth/register`, payload);
  }

  login(payload: LoginPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseurl}/auth/login`, payload);
  }


}
