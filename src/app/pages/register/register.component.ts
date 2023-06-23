import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterPayload} from "../../models/register-payload";
import {AuthServiceService} from "../../services/auth-service.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      console.log('this is an invalid form');
      return;
    }

    const payload: RegisterPayload = {
      username: this.registerForm.controls['username'].value,
      password: this.registerForm.controls['password'].value,
      confirmPassword: this.registerForm.controls['confirmPassword'].value
    }

    // call service to send payload to backend api
    this.authService.register(payload).subscribe({
      next: value => {
        console.log("New user has been registered");
        this.router.navigate(['/login'])
      },
      error: err => {
        console.log("Error has occured");
        console.log(err);
      }
    })

    console.log(this.registerForm.value);
  }

}
