import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { LoginDialogComponent } from '../core/header/navbar/login-dialog/login-dialog.component';
import { DialogData } from '../core/header/navbar/login-dialog/DialogData';
import { LoginDialogService } from '../core/header/navbar/login-dialog/login-dialog.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();
  public dialogWithForm: MatDialogRef<LoginDialogComponent, DialogData>;
  public email: string;
  public password: string;

  constructor(
    public dialog: MatDialog,
    public loginDialogService: LoginDialogService,
    public authService: AuthService,
    public router: Router
  ) { }

  public ngOnInit(): void { }

  public dialogForm(): void {
    if (this.authService.uid) {
      this.router.navigate(['/game']);
    } else {
      this.loginDialogService.authorization = false;
      this.dialogWithForm = this.dialog
      .open(LoginDialogComponent, {
        data: { email: this.email, password: this.password }
      });

      this.dialogWithForm.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
        )
      .subscribe((result:DialogData) => {
        if (result) {
          this.email = result.email;
          this.password = result.password;
        }
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
