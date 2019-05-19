import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { DialogData } from './login-dialog/DialogData';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDialogService } from './login-dialog/login-dialog.service';
import { ProfileInfoService } from 'src/app/services/profile-info.service';

@Component({
  selector: 'header-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();
  public dialogWithForm: MatDialogRef<LoginDialogComponent, DialogData>;
  public email: string;
  public password: string;
  public userPlayer$: Observable<any>;

  constructor(
    public profileInfoService: ProfileInfoService,
    public dialog: MatDialog,
    public authService: AuthService,
    public loginDialogService: LoginDialogService
  ) {
    this.userPlayer$ = profileInfoService.userPlayer$;
  }

  public isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.userDetails = null;
    this.authService.uid = null;
    this.authService.logout();
  }

  public dialogForm(): void {
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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
