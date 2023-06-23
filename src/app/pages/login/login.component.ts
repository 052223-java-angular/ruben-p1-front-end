import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";
import {LoginPayload} from "../../models/login-payload";
import { SessionService} from "../../services/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      console.log('this is an invalid form');
      return;
    }

    const payload: LoginPayload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }

    // call service to send payload to backend api
    this.authService.login(payload).subscribe({

      next: value => {
        console.log("Welcome back!");

        this.sessionService.user_id = value.id;
        this.sessionService.username = value.username;
        this.sessionService.token = value.token;


        this.router.navigate([''])
      },
      error: err => {
        console.log("Login error has occured");
        console.log(err);
      }
    })

    console.log(this.loginForm.value);
  }

}
