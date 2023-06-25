import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {UsersAllPayload} from "../models/users-all-payload";
import {CreaturePayload} from "../models/creature-payload";
import {CreatureObjectPayload} from "../models/creature-object-payload";
import { UserServiceService} from "./user-service.service";
import {SoldierPayload} from "../models/soldier-payload";
import {environment} from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class CreatureServiceService {
  // set the base url
  baseurl = 'https://botw-compendium.herokuapp.com/api/v2'

  //siteUrl = 'http://localhost:8080/api/monsters/'
  siteUrl: string = environment.apiBaseUrl + '/monsters/';


  // authenticate services
  httpOptions = {

    headers: new HttpHeaders({
      'auth-token': this.userService.getAuth()?.token!,
    }),
  };


  constructor(private http: HttpClient, private userService: UserServiceService) { }

  getUsers(): Observable<CreaturePayload[]>{
    return this.http.get<any[]>(`${this.baseurl}/category/monsters`);
  }

  // takes passed param and applies to endpoint for retrieval
  getCreatureName(name: string) {
    return this.http.get<any>(`${this.baseurl}`+`/entry/`+ name);
  }

  //adds a new creature to users army
  postCreature(soldier: SoldierPayload) {
    console.log(localStorage.getItem(JSON.stringify(soldier)));
    return this.http.post<void>(
        `${this.siteUrl}`+ soldier.name + `/add`,
        soldier
        //this.httpOptions
    );
  }


    //return this.http.post<any>(`${this.baseurl}` + `/hello`);



}
