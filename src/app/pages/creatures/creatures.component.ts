import { Component } from '@angular/core';
import {UsersAllPayload} from "../../models/users-all-payload";
import {UserServiceService} from "../../services/user-service.service";
import {CreaturePayload} from "../../models/creature-payload";
import {CreatureServiceService} from "../../services/creature-service.service";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {Location} from "@angular/common";


@Component({
  selector: 'app-creatures',
  templateUrl: './creatures.component.html',
  styleUrls: ['./creatures.component.css']
})
export class CreaturesComponent {
  public creatures: CreaturePayload[] = [];

  constructor(private creatureService: CreatureServiceService,
              private router: Router,
              private  sessionService: SessionService,
              private _location: Location
  ) { }

  ngOnInit() {
    this.creatureService.getUsers().subscribe({

      next: (resp: any) => {

        console.log(localStorage.getItem('username'));
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

  backClicked() {
    this._location.back();
  }

  onRowClicked(c: CreaturePayload) {
    console.log(c.name);
    let temp = c.name;
    this.router.navigate([`details/`+ (c.name)])
  }


}
