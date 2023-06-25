import {ChangeDetectorRef, Component} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ActivatedRoute} from "@angular/router";
import {UsersAllPayload} from "../../models/users-all-payload";
import {UserServiceService} from "../../services/user-service.service";
import {ArmyServiceService} from "../../services/army-service.service";
import {SoldierModel} from "../../models/soldier-model";
import {CreaturePayload} from "../../models/creature-payload";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent {
  public username!: string;
  public manage: boolean = false;
  public army_id: string = "";
  public user!: UsersAllPayload;
  public army: SoldierModel[] = [];
  public list: boolean = false;
  protected readonly sessionStorage = sessionStorage;

  global() {
    this.ngOnInit();
    this.openSoldiers();
  }


  constructor(private sessionService: SessionService,
              private userService: UserServiceService,
              private armyService: ArmyServiceService,
              private route: ActivatedRoute
              //private ref: ChangeDetectorRef
              ) {
    //ref.detach();
    //setInterval(() => { this.ref.detectChanges(); }, 5000)
    this.username = this.route.snapshot.params['username']
  }

  openSoldiers() {

    this.armyService.getSoldiers(this.army_id).subscribe( {
      next: (resp: any) => {
        console.log("results are", resp)
        this.list = true;
        this.army = resp;

        console.log("after assignment", resp.data)
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  // dismiss that soldier
  dismissSoldier(soldier_id: string) {
    console.log('manage:'+ this.manage + ', deleting soldier: ' + soldier_id)
    if (this.manage == true) {
      this.armyService.deleteSoldiers(soldier_id);
    }
  }

  // view army
  manageArmy(){
    if (this.manage ==  false) {
      this.manage = true;
    } else {
      this.manage = false;
    }
    console.log('manage army hit and set to: '+ this.manage)
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

  }

  ngAfterViewInit() {
    this.openSoldiers();
  }


}
