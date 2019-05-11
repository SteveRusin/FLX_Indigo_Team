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
  
  public detectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public uploadSingle(): void {
    const file: File = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadFileService.pushUpload(this.currentUpload);
  }
}
