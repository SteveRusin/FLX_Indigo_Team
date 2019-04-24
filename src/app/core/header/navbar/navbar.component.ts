import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { DialogData } from './login-dialog/DialogData';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDialogService } from './login-dialog/login-dialog.service';

@Component({
  selector: 'header-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public dialogWithForm: MatDialogRef<LoginDialogComponent, DialogData>;
  public email: string;
  public password: string;
  public profileAvatar: string;

  constructor(public dialog: MatDialog,
    public authService: AuthService,
    public loginDialogService: LoginDialogService) {
      authService.isLoggedIn();
      // console.log(authService.userDetails + ' sdfdsfdsf');
  }

  public isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }

  public dialogForm(): void {
    this.loginDialogService.authorization = false;
    this.dialogWithForm = this.dialog
    .open(LoginDialogComponent, {
      data: { email: this.email, password: this.password }
    });

    this.dialogWithForm.afterClosed()
    .subscribe((result:DialogData) => {
      console.log(this.dialogWithForm);
      if (result) {
        this.email = result.email;
        this.password = result.password;
      }
    });
  }
}
