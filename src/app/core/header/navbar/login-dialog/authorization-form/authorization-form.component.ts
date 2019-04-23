import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AuthService } from 'src/app/services/auth.service';
import { LoginDialogComponent } from '../login-dialog.component';

@Component({
  selector: 'dialog-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.scss']
})
export class AuthorizationFormComponent {
  public hide: boolean = true;
  public nickname: string;
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public password: string;

  public authorizationForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              public authService: AuthService) {
    this.authorizationForm = new FormGroup({
      nickname: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  public getErrorMessage(): string {
    return this.email.hasError('required') ? 'Please enter a valid email address' :
           this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public onSubmit(): any {
    // TODO: Use EventEmitter with form value
    console.warn(this.email.value);
  }

  public authorizationWithEmailAndPassword(): void {
    this.authService
      .createUserWithEmailAndPassword(this.authorizationForm.value.email,
                                      this.authorizationForm.value.password,
                                      this.authorizationForm.value.nickname);
    this.dialogRef.close();
  }

  public authorizationWithGoogle(): void {
    this.authService.signInWithGoogle();
    this.dialogRef.close();
  }
}
