import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  selectedDate = new FormControl(new Date());
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: RegistrationService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  dateFilter: DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) {
      return true; 
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    return date <= currentDate;
  };

  register() {
    if (this.myForm.valid) {
      const formData: User = this.myForm.value as User;

      this.authService.registerUser(formData)
      .subscribe(
        () => {
          console.log(formData.email);
          
          const accessToken = this.authService.getAccessToken();
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('user_email', formData.email);
          this.router.navigate(['/dashBoard']);

         
        },
        (error) => {
          console.error('Registration failed:', error);
          
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
  isInvalid(controlName: string): boolean {
    const control = this.myForm.get(controlName);
    return (control?.invalid && (control.dirty || control.touched)) || false;
  }
}
