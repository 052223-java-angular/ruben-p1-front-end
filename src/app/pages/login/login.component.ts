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

        sessionStorage.setItem('user', value.username);
        sessionStorage.setItem('token', value.token);
        sessionStorage.setItem('id', value.id);
        sessionStorage.setItem('role', value.role);

        this.router.navigate([''])
      },
      error: err => {
        console.log("Login error has occured");
        console.log(err);
      }
    });

    if (!this.loginForm.value.username) {
      this.loginForm.get('username')?.markAsDirty();
    }
    if (!this.loginForm.value.password) {
      this.loginForm.get('password')?.markAsDirty();
    }

    console.log("login complete");
  }



}
