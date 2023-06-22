import {Component, OnInit} from '@angular/core';
import {UsersAllPayload} from "../../models/users-all-payload";
import {ActivatedRoute, ParamMap} from "@angular/router";
import { CreatureServiceService} from "../../services/creature-service.service";
import {CreaturePayload} from "../../models/creature-payload";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements  OnInit{
  public name: string = "";
  public creature!: CreaturePayload

  // sets name to be the passed param
  constructor(private route: ActivatedRoute, private creatureService: CreatureServiceService) {
    this.name = this.route.snapshot.params['name']
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
}
