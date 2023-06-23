import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CreaturePayload} from "../models/creature-payload";
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArmyServiceService {
  baseurl = 'http://localhost:8080/api'

  constructor (private http: HttpClient) { }


  // get soldiers tied with a user and their army tag
  getSoldiers(army_id: string): Observable<CreaturePayload[]> {
    return this.http.get<any[]>(`${this.baseurl}/soldier/` + army_id);
  }


}
