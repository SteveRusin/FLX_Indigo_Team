import { Component } from '@angular/core';

import { ProfileInfoService } from 'src/app/services/profile-info.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent {

  constructor(public profile: ProfileInfoService) { }

}
