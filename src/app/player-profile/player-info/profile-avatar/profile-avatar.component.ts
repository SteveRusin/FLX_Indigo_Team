import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileInfoService } from 'src/app/services/profile-info.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Upload } from 'src/app/upload';

@Component({
  selector: 'profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})

export class ProfileAvatarComponent implements OnInit {

  public userPlayer$: Observable<any>;
  public selectedFiles: FileList;
  public currentUpload: Upload;

  constructor(
    public profileInfoService: ProfileInfoService,
    public uploadFileService: UploadFileService
  ) {
    this.userPlayer$ = profileInfoService.userPlayer$;
   }

  public ngOnInit(): void {
  }

  public triggerInput(): void {
    const element: HTMLElement = document.getElementById('file-input') as HTMLElement;
    element.click();
  }
  
  public detectFiles(event: any): void {
    const file: File = event.target.files;
    console.log(file);
    if (
      event.target.files.length !== 0
      && file[0].type.endsWith('png')
      || file[0].type.endsWith('jpeg')
    ) {
      this.selectedFiles = event.target.files;
      event.target.files = null;
    }
  }

  public uploadSingle(): void {
    const file: File = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadFileService.pushUpload(this.currentUpload);
    this.selectedFiles = null;
  }
}
