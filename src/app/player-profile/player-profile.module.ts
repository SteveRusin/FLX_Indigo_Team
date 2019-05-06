import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material';

import { PlayerProfileComponent } from './player-profile.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { ProfileInfoService } from '../services/profile-info.service';
import { profileRoutes } from './player-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    MatCardModule
  ],
  declarations: [
    PlayerProfileComponent,
    PlayerInfoComponent,
    PokemonsListComponent
  ],
  providers: [
    ProfileInfoService
  ]
})
export class PlayerProfileModule { }
