import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
    
    public canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      return new Promise((resolve: any): void => {
        firebase.auth()
          .onAuthStateChanged((user: firebase.User) => {
            if (user) {
              resolve(true);
            } else {
              console.log('User is not logged in');
              this.router.navigate(['']);
              resolve(false);
            }
        });
      });
    }
  
}
