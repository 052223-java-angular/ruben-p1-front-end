import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ActivatedRoute} from "@angular/router";
import {UsersAllPayload} from "../../models/users-all-payload";
import {UserServiceService} from "../../services/user-service.service";
import {ArmyServiceService} from "../../services/army-service.service";
import {SoldierModel} from "../../models/soldier-model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public username!: string;
  public army_id: string = "";
  public user!: UsersAllPayload;
  public army!: SoldierModel[];

  constructor(private sessionService: SessionService,
              private userService: UserServiceService,
              private armyService: ArmyServiceService,
              private route: ActivatedRoute
              ) {
    this.username = this.route.snapshot.params['username']
  }

  openSoldiers() {
    this.armyService.getSoldiers(this.army_id).subscribe( {
      next: (resp: any) => {
        console.log("results are", resp)
        this.army = resp.data;

        var array = this.army;
        array.sort((a,b) => a.name.localeCompare(b.name));

        console.log("results are", resp)
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  ngOnInit() {
    this.userService.getUser(this.username).subscribe({

      next: (resp: UsersAllPayload) => {
        this.user = resp;
        this.army_id = resp.army_id;
        console.log("user retrieved ", resp)
      },
      error: (err) => {
        console.log(err);
      }
    })

    console.log("Users recieved, getting soldiers")
    this.armyService.getSoldiers(this.army_id).subscribe( {
      next: (resp: any) => {
        console.log("results are", resp)
        this.army = resp.data;

        var array = this.army;
        array.sort((a,b) => a.name.localeCompare(b.name));

        console.log("results are", resp)
      },
      error: (err) => {
        console.log(err);
      }
    })



  }
}
