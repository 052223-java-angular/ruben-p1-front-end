import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    console.log(this.sessionService.username);
    console.log(this.sessionService.user_id);
    console.log(this.sessionService.token);
  }

}
