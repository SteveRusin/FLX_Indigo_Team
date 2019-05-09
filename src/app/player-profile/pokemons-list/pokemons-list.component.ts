import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileInfoService } from 'src/app/services/profile-info.service';

@Component({
  selector: 'player-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {
  public userPokemons$: Observable<any>;

  constructor(
    public profileInfoService: ProfileInfoService
  ) {
    this.userPokemons$ = profileInfoService.userPokemons$;
  }

  public ngOnInit(): void {
  }

}
