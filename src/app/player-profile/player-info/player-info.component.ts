import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileInfoService } from 'src/app/services/profile-info.service';

@Component({
  selector: 'player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent {
  public userPlayer$: Observable<any>;

  constructor(
    public profileInfoService: ProfileInfoService
  ) {
    this.userPlayer$ = profileInfoService.userPlayer$;
   }

  public getWinrate(battles: any): number {
    return battles.wins * 100 / battles.all | 0;
  }
}
