import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    public username!: string;
    protected readonly sessionStorage = sessionStorage;

    ngOnInit() {
        this.username = sessionStorage.getItem('user')!;
    }
}
