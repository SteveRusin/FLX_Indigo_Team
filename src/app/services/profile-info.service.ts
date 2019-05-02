import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class ProfileInfoService {
  public id: string;
  public avatar: string;
  public nickname: string;
  public battles: number;
  public db: any = firebase.firestore();
  private data: any;
  // this.avatar = doc.data().avatar;
  // this.nickname = doc.data().name;

  constructor(public auth: AuthService,
    public authGuardService: AuthGuardService) {
      this.id = auth.userDetails && auth.userDetails.uid;
  }

  public playerData(): any {
    this.db.collection('players')
    .doc(this.id)
    .get()
    .then((doc: any) => {
      this.data = doc.data();
      console.log(doc.data());
    });
  }
}
