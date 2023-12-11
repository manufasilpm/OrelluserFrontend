import { Component, OnInit } from '@angular/core';
import { User, UserDetails } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from './user-edit/user-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: UserDetails | null = null;
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'dob', 'address', 'phoneNumber'];

  constructor(private userService:UserService, public dialog: MatDialog,private router:Router) { }

  ngOnInit(): void {
    this.getUserDetails();

  }


  getUserDetails(): void {
    this.userService.getUserDetails().subscribe(
      (response: UserDetails) => {
        this.user = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
        
      }

      
    );
  }

  editUser(): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '400px',
      data: this.user 
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.user = result;
        this.userService.updateUserDetails(this.user).subscribe(
          (updatedUser: UserDetails) => {
            console.log('User details updated successfully:', updatedUser);
          },
          (error) => {
            console.error('Error updating user details:', error);
            
          }
        );
      }})
  }

  logOut():void{
    localStorage.setItem("access_token","")
    this.router.navigate(['/login']);
  }

}
