import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CreaturePayload} from "../models/creature-payload";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserServiceService} from "./user-service.service";

@Injectable({
  providedIn: 'root'
})
export class ArmyServiceService {
  baseurl = 'http://localhost:8080/api'

  private httpOptions = {
    headers: new HttpHeaders({
      'auth-token': this.userService.getAuth()?.token!,
    }),
  };

  constructor (private http: HttpClient,
               private userService: UserServiceService) { }


  // get soldiers tied with a user and their army tag
  getSoldiers(army_id: string): Observable<CreaturePayload[]> {
    return this.http.get<any[]>(`${this.baseurl}/soldier/` + army_id);
  }

  // remove soldiers from army
  deleteSoldiers(soldier_id: string): Observable<void>{
    console.log('[army-service] Deleting soldier: ' + soldier_id)
    let queryParams = new HttpParams().set('user_id', sessionStorage.getItem('user')!)
    return this.http.delete<void>(`${this.baseurl}/soldier/delete/` + soldier_id,
        this.httpOptions
    );
  }


}
