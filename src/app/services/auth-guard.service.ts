import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

    public canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      return this.auth.user
        .pipe(
          take(1),
          map((user:firebase.User):boolean => {
          if (user === null) {
            this.router.navigate(['']);
          }

          return user !== null;
        }));
    }
}
