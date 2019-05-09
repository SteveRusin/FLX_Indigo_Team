import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { ProfileInfoService } from '../services/profile-info.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerProfileComponent implements OnInit {

  constructor(
    public profileInfoService: ProfileInfoService
  ) { }

  public ngOnInit(): void {
  }
}
