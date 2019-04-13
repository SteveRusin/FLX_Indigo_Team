import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { DialogData } from './login-dialog/DialogData';

@Component({
  selector: 'header-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public dialogWithForm: MatDialogRef<LoginDialogComponent, DialogData>;
  public email: string;
  public password: string;

  constructor(private dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  public dialogForm(): void {
 
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
