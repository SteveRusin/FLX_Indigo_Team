import { Injectable } from '@angular/core';

@Injectable()
export class LoginDialogService {
  public authorization: boolean = false;

  constructor() { }

  public signInForm(): boolean {
    this.authorization = !this.authorization;

    return this.authorization;
  }
}
