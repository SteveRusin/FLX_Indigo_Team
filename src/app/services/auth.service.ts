import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;
  public profileAvatar: string;
  public email: string;
  public password: string;

  constructor(private _firebaseAuth: AngularFireAuth,
              private router: Router) {
    this.user = this._firebaseAuth.authState;
    this.user.subscribe(
      (user:firebase.User) => {
        if (user) {
          this.userDetails = user;
          this.profileAvatar = this.userDetails.photoURL;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  public signInWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  public isLoggedIn(): boolean {
    return this.userDetails !== null;
  }
  
  public logout(): void {
    this._firebaseAuth.auth.signOut()
    .then(this.userDetails = null)
    .then((res: void) => {
      this.router.navigate(['/']);
      console.log(res);
    });
  }

  public signInWithEmailAndPassword(email: string, password: string): void {
    console.log(email, password);
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
      .catch((error: any) => {
       const errorCode: string = error.code;
       const errorMessage: string = error.message;
       if (errorCode === 'auth/wrong-password') {
         alert('Wrong password.');
       } else {
         alert(errorMessage);
       }
       console.log(error);
     });
  }
}
