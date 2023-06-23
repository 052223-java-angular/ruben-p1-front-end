import { Component, OnInit } from '@angular/core';
import {ArmyPayload} from "../../models/army-payload";
import { UserServiceService} from "../../services/user-service.service";
import {ActivatedRoute} from "@angular/router";
import {ArmyServiceService} from "../../services/army-service.service";
import {CreaturePayload} from "../../models/creature-payload";
import {SoldierModel} from "../../models/soldier-model";
import {UsersAllPayload} from "../../models/users-all-payload";

@Component({
  selector: 'app-army',
  templateUrl: './army.component.html',
  styleUrls: ['./army.component.css']
})
export class ArmyComponent implements OnInit{
  public army: any = {};
  public army_id: string;
  public creature!: SoldierModel;
  public user!: UsersAllPayload;

  constructor(private route: ActivatedRoute,
              private armyService: ArmyServiceService,
              private userService: UserServiceService) {

    this.army_id = this.route.snapshot.params['army_id']
  }

  ngOnInit() {

    // retrieve and army, I will need the user id
    this.userService.getUserArmy(this.army).subscribe({

      next: (resp: any) => {
        console.log('getting user army', resp)
        this.army = resp.data.data
        var array: ArmyPayload[] = this.army;

        console.log('passed storage set army')
      },
      error: (err) => {
        console.log('error with retrieving army');
        console.log(err);
      }




    })

    this.armyService.getSoldiers(this.army_id).subscribe({

      next: (resp: any) => {
        this.creature = resp.data;

        console.log("Returning soldiers", resp.data)
      },

      error: (err) => {
        console.log(err);
      }
    })




  }







}
