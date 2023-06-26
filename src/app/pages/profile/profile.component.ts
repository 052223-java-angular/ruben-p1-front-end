import {ChangeDetectorRef, Component} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersAllPayload} from "../../models/users-all-payload";
import {UserServiceService} from "../../services/user-service.service";
import {ArmyServiceService} from "../../services/army-service.service";
import {SoldierModel} from "../../models/soldier-model";
import {CreaturePayload} from "../../models/creature-payload";
import {DeletePayload} from "../../models/delete-payload";
import {StatsPayload} from "../../models/returns/stats-payload";
import {BattlePayload} from "../../models/battle-payload";
import {BattleLog} from "../../models/returns/battle-log";

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
  public stats!: StatsPayload;
  public battle!: BattlePayload;
  public results!: BattlePayload;
  public list: boolean = false;
  protected readonly sessionStorage = sessionStorage;

  global() {
    this.ngOnInit();
    this.openSoldiers();
    this.getStats()
  }

  onRowClicked(name: string) {
    console.log(name);
    let temp = name;
    if(this.manage == false ) {
      this.router.navigate([`details/`+ (name)])
    }
  }


  constructor(private sessionService: SessionService,
              private userService: UserServiceService,
              private armyService: ArmyServiceService,
              private route: ActivatedRoute,
              public router: Router
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

  startBattle(soldier_id: string) {
    const payload: BattlePayload = {
      player_1: soldier_id,
      player_2: sessionStorage.getItem('user')!,
      user_id: sessionStorage.getItem('id')!,
    }

    this.armyService.startBattle(payload).subscribe({

      next: (resp: any) => {
        console.log("Battle completed! ", resp);
        this.results = resp;
      },
      error: err => {
        console.log("Error with battle. No draw/No win/loss", err);
      }
    });
  }

  // dismiss that soldier
  dismissSoldier(soldier_id: string) {
    const payload: DeletePayload = {
      soldier_id: soldier_id,
      user_id: sessionStorage.getItem('id')!,
    }

    console.log('manage:'+ this.manage + ', deleting soldier: ' + soldier_id)
    if (this.manage == true) {
      this.armyService.deleteSoldiers(payload).subscribe({
        next: resp => {
          console.log("Soldier deleted");
          this.openSoldiers();
        },
        error: err => {
          console.log("Error dismisses soldier")
        }
      });
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

  // get user statistics
  getStats() {
    this.userService.getStats(this.username).subscribe( {
      next: (resp: any) => {
        console.log("Stats recieved, results: ", resp)
        this.stats=resp;
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

  }

  ngAfterViewInit() {
    this.openSoldiers();
    this.getStats();
  }

}
