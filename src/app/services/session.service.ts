import {Injectable, Optional, SkipSelf} from '@angular/core';
import {AuthServiceService} from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public army_id: any;
  public stats_id: any;
  public token: any;

  //return username
  getArmyId():string {
    return this.army_id;
  }

  setArmyId(armyid: string): void {
    this.army_id = armyid;
  }

  //return user id
  getStatsId():string {
    return this.stats_id;
  }

  //return a session token
  getTokenCredentials():string {
    return this.token;
  }

  constructor(@Optional() @SkipSelf() sharedService?: AuthServiceService) {
    if (sharedService) {
      throw new Error( `Session is already loaded`);
    }
    console.info(`Session has been created`)

  }


}
