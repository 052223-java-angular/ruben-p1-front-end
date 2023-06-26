import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CreaturePayload} from "../models/creature-payload";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserServiceService} from "./user-service.service";
import { environment} from "../environments/environments";
import {DeletePayload} from "../models/delete-payload";
import { BattlePayload} from "../models/battle-payload";

@Injectable({
  providedIn: 'root'
})
export class ArmyServiceService {
  //baseurl = 'http://localhost:8080/api'
  baseurl: string = environment.apiBaseUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'auth-token': this.userService.getAuth()?.token!,
    }),
  };

  constructor (private http: HttpClient,
               private userService: UserServiceService) { }


  // get soldiers tied with a user and their army tag
  getSoldiers(army_id: string): Observable<CreaturePayload[]> {
    console.log("Getting user profile soldiers..." + army_id)
    return this.http.get<any[]>(`${this.baseurl}/soldier/` + army_id);
  }

  startBattle(battle: BattlePayload): Observable<void>{
    console.log('[army-service] Starting battle. p1/p2: ' + battle.player_1 + " | " + battle.player_2)
    //let queryParams = new HttpParams().set('user_id', sessionStorage.getItem('user')!)
    const headers = new HttpHeaders().set('auth-token', sessionStorage.getItem('token')!);
    const url = `${this.baseurl}/battle/create`;
    console.log("Url: " + url);
    return this.http.put<void>(url, battle, {headers: headers}
    );
  }

  // remove soldiers from army
  deleteSoldiers(dissMiss: DeletePayload): Observable<void>{
    console.log('[army-service] Deleting soldier: ' + dissMiss.soldier_id)
    //let queryParams = new HttpParams().set('user_id', sessionStorage.getItem('user')!)
    const headers = new HttpHeaders().set('auth-token', sessionStorage.getItem('token')!);
    const url = `${this.baseurl}/soldier/delete/${dissMiss.soldier_id}`;
    console.log("Url: " + url);

    return this.http.delete<void>(url, {headers: headers, body: dissMiss}
    );
  }


}
