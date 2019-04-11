import { PlayerProfileRoutingModule } from './player-profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerProfileComponent } from './player-profile.component';

@NgModule({
  imports: [CommonModule, PlayerProfileRoutingModule],
  declarations: [PlayerProfileComponent]
})
export class PlayerProfileModule { }
