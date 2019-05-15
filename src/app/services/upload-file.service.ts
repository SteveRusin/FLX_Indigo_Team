import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';

import { Upload } from '../upload';

@Injectable()
export class UploadFileService {

  public currentDateInSeconds: number = +new Date() / 1000 | 0;
  public db: any = firebase.firestore();
  public storage: any = firebase.storage();

  public metadata: any = {
    contentType: 'image/jpeg',
  };

  constructor(
    public authService: AuthService
  ) { }

  private basePath:string = '/players_avatar';

  public pushUpload(upload: Upload): void {
    const storageRef: any = firebase.storage()
      .ref();
    const uploadTask: any = storageRef.child(`${this.basePath}/${this.currentDateInSeconds}.png`)
      .put(upload.file, this.metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error: firebase.FirebaseError) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL: string) => {
          console.log('File available at', downloadURL);
          this.newPlayerAvatar(downloadURL);
        });
      }
    );
  }

  public newPlayerAvatar(url: string): void {
    this.db
      .collection('players')
      .doc(this.authService.uid)
      .update({
        avatar: url
      });
  }
}
