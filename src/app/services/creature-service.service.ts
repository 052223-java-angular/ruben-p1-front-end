import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {UsersAllPayload} from "../models/users-all-payload";
import {CreaturePayload} from "../models/creature-payload";
import {CreatureObjectPayload} from "../models/creature-object-payload";

@Injectable({
  providedIn: 'root'
})
export class CreatureServiceService {

  // set the base url
  baseurl = 'https://botw-compendium.herokuapp.com/api/v2'

  siteUrl = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<CreaturePayload[]>{
    return this.http.get<any[]>(`${this.baseurl}/category/monsters`);
  }

  // takes passed param and applies to endpoint for retrieval
  getCreatureName(name: string) {
    return this.http.get<any>(`${this.baseurl}`+`/entry/`+ name);
  }


}
