import { Component, Inject  } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDetails } from 'src/app/model/user.model';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  editedUser: UserDetails;

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetails
  ) {
    
    this.editedUser = { ...data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
   
    this.dialogRef.close(this.editedUser);
  }
 

}
