import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogData } from './DialogData';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDialogService } from './login-dialog.service';

@Component({
  selector: 'navbar-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
      public authService: AuthService, public loginDialogService: LoginDialogService) { }

  public authorisationForm(): boolean {
    return this.loginDialogService.signInForm();
  }
}
