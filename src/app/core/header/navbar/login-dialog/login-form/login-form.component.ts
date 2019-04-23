import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AuthService } from 'src/app/services/auth.service';
import { LoginDialogComponent } from '../login-dialog.component';
import { LoginDialogService } from './../login-dialog.service';

@Component({
  selector: 'dialog-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
  public hide: boolean = true;
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public password: string;
  public loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              public loginDialogService: LoginDialogService,
              public authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  public signInForm(): void {
    this.loginDialogService.signInForm();
  }

  public getErrorMessage(): string {
    return this.email.hasError('required') ? 'Please enter a valid email address' :
           this.email.hasError('email') ? 'Not a valid email' : '';
    }

  public onSubmit(): any {
    // TODO: Use EventEmitter with form value
    console.warn(this.email.value);
  }

  public signInWithGoogle(): void {
    this.authService.signInWithGoogle();
    this.dialogRef.close();
  }

  public signInWithEmailAndPassword(): void {
    console.log(this.loginForm.value);
    this.authService
      .signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
    this.dialogRef.close();
  }
}
