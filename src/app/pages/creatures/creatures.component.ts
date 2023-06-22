import { Component } from '@angular/core';
import {UsersAllPayload} from "../../models/users-all-payload";
import {UserServiceService} from "../../services/user-service.service";
import {CreaturePayload} from "../../models/creature-payload";
import {CreatureServiceService} from "../../services/creature-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-creatures',
  templateUrl: './creatures.component.html',
  styleUrls: ['./creatures.component.css']
})
export class CreaturesComponent {
  public creatures: CreaturePayload[] = [];

  constructor(private creatureService: CreatureServiceService, private router: Router) { }

  ngOnInit() {
    this.creatureService.getUsers().subscribe({
      next: (resp: any) => {
        this.creatures = resp.data;

        var array = this.creatures;
        array.sort((a,b) => a.name.localeCompare(b.name));


        console.log("results are", resp.data)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onRowClicked(c: CreaturePayload) {
    console.log(c.name);

    //this.router.navigate([c.name])
  }


}
