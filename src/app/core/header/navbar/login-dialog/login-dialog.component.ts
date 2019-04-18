import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogData } from './DialogData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
                             public authService: AuthService) { }
  
  public onNoClick(): void {
    this.dialogRef.close();
  }
  public signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }
}
