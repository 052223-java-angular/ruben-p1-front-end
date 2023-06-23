import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    protected readonly sessionStorage = sessionStorage;

    onLogout() {
        sessionStorage.clear();
        localStorage.clear();
        console.log("User has logged out");
    }
}
