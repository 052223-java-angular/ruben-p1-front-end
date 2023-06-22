import {Component, OnInit} from '@angular/core';
import {UsersAllPayload} from "../../models/users-all-payload";
import {ActivatedRoute, ParamMap} from "@angular/router";
import { CreatureServiceService} from "../../services/creature-service.service";
import {CreaturePayload} from "../../models/creature-payload";
import { SoldierPayload} from "../../models/soldier-payload";
import  { UserServiceService} from "../../services/user-service.service";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements  OnInit{
  public name: string = "";
  public creature!: CreaturePayload

  // sets name to be the passed param
  constructor(private route: ActivatedRoute, private creatureService: CreatureServiceService, private userService: UserServiceService) {
    this.name = this.route.snapshot.params['name']
    console.log(this.route.snapshot.params[''])
  }

  ngOnInit() {
    this.creatureService.getCreatureName(this.name).subscribe({
      next: (resp: any) => {
        this.creature = resp.data;

        console.log("results are", resp.data)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToArmy() {
    let army_id = this.userService.getUserArmy()

    const soldier: SoldierPayload = {
      name: this.creature.name,
      description: this.creature.description,
      image: this.creature.image,
      army_id: <any>army_id,
      user_id: <any>localStorage.getItem('username'),
    };
    this.creatureService.postCreature(soldier).subscribe({
      next:() => {
        this.ngOnInit();
        console.log("Soldier has been added");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
