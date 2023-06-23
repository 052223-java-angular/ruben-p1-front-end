import {Component, OnInit} from '@angular/core';
import {UsersAllPayload} from "../../models/users-all-payload";
import {ActivatedRoute, ParamMap} from "@angular/router";
import { CreatureServiceService} from "../../services/creature-service.service";
import {CreaturePayload} from "../../models/creature-payload";
import { SoldierPayload} from "../../models/soldier-payload";
import  { UserServiceService} from "../../services/user-service.service";
import {ArmyPayload} from "../../models/army-payload";
import {Observable} from "rxjs";
import { SessionService} from "../../services/session.service";
import {UsernamePayload} from "../../models/username-payload";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements  OnInit{
  public name: string = "";
  public creature!: CreaturePayload;
  public army!: ArmyPayload;

  // sets name to be the passed param
  private username: string = JSON.stringify(localStorage.getItem('username'));
  private token: string = JSON.stringify(localStorage.getItem('auth'));


  // constructor
  constructor(private route: ActivatedRoute,
              private creatureService: CreatureServiceService,
              private userService: UserServiceService,
              private sessionService: SessionService
              ) {
      this.name = this.route.snapshot.params['name'],
      console.log(this.route.snapshot.params[''])
  }

  ngOnInit() {
    console.log(this.sessionService.username);
    console.log(this.sessionService.user_id);
    console.log(this.sessionService.token);
    this.creatureService.getCreatureName(this.name).subscribe({

      next: (resp: any) => {
        this.creature = resp.data;

        console.log("results are", resp.data)
      },

      error: (err) => {
        console.log(err);
      }
    })

    const army: UsernamePayload = {
      username: this.sessionService.username,
    };

    console.log(`[details.ts] username: ` + this.sessionService.username);
    this.userService.getUserArmy().subscribe({


      next: (resp: any) => {
        console.log('getting user army', resp);
        this.army = resp.data;
      },
      error: (err) => {
        console.log('error with retrieving army');
        console.log(err);
      }
    })
  }

  addToArmy() {

    console.log("add to army hit");
    console.log(this.creature.name);

    // coming back as undefined?????
    console.log(this.userService.getAuth()?.id!);

    console.log(JSON.stringify(this.army));

    const soldier: SoldierPayload = {
      name: this.creature.name,
      description: this.creature.description,
      image: this.creature.image,
      army_id: 'c3d89f02-7485-4eb6-b268-45025cc1364b',
      token: this.token,
      username: this.sessionService.username,
      user_id: JSON.parse(localStorage.getItem('user_id')!)
    };

    this.creatureService.postCreature(soldier).subscribe({
      next:() => {
        this.ngOnInit();
        console.log("Soldier has been added");
      },
      error: (err) => {
        console.log("error with adding soldier");
        console.log(err);
      },
    });
  }
}
