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
  public army!: ArmyPayload
  constructor(private route: ActivatedRoute,
              private creatureService: CreatureServiceService,
              private userService: UserServiceService,
              private sessionService: SessionService
              ) {

      this.name = this.route.snapshot.params['name']
  }

  // get user army
  getArmy(username: string) {
    //this.userService.getArmy(username).subscribe(data => this.army = data);
  }


  ngOnInit() {
    console.log(sessionStorage.getItem('user'))
    console.log(sessionStorage.getItem('id'))
    console.log(sessionStorage.getItem('token'))

    this.creatureService.getCreatureName(this.name).subscribe({

      next: (resp: any) => {
        console.log("results are", resp.data)
        this.creature = resp.data;


      },

      error: (err) => {
        console.log(err);
      }
    })

    // get the user army
    this.userService.getUserArmy(sessionStorage.getItem('user')!).subscribe({

      next: (resp: any) => {
        console.log('getting user army', resp)

        this.army = resp.data

        var army_details: ArmyPayload = this.army;

        console.log('passed storage set army')

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
      token: sessionStorage.getItem('token')!,
      username: sessionStorage.getItem('user')!,
      user_id: sessionStorage.getItem('id')!
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

  protected readonly sessionStorage = sessionStorage;
}
