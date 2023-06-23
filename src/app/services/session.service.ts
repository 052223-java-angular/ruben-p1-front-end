import {Injectable, Optional, SkipSelf} from '@angular/core';
import {AuthServiceService} from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public username: any;
  public user_id: any;
  public army_id: any;
  public stats_id: any;
  public token: any;

  //return username
  getUserCredentials():string {
    return this.username;
  }

  //return user id
  getUserIDCredentials():string {
    return this.user_id;
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
