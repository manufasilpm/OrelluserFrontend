import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/loginModel';

import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,private authService:RegistrationService) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  navigateSignUp() {
    this.router.navigate(['/registration']);
  }

  ngOnInit(): void {}

  isInvalid(controlName: string): boolean {
    const control = this.myForm.get(controlName);
    return (control?.invalid && (control.dirty || control.touched)) || false;
  }

  login() {
    if (this.myForm.valid) {
      const loginData: LoginModel = this.myForm.value;
      this.authService.login(loginData).subscribe(
        () => {
          console.log('Login successful');
          this.router.navigate(['/dashBoard']);
        },
        (error) => {
          console.error('Login failed:', error);
          // Handle error, e.g., display an error message
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
