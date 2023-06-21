import {Component, OnInit} from '@angular/core';
import {UsersAllPayload} from "../../models/users-all-payload";
import {UserServiceService} from "../../services/user-service.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements  OnInit{
  public users: UsersAllPayload[] = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe({
        next: (resp: UsersAllPayload[]) => {
            this.users = resp;
            console.log("users retrieved hit")
      },
        error: (err) => {
            console.log(err);
        }
    })
  }

}
