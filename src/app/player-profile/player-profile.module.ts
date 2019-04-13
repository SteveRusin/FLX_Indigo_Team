import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlayerProfileComponent } from './player-profile.component';

import { profileRoutes } from './player-profile-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(profileRoutes)],
  declarations: [PlayerProfileComponent]
})
export class PlayerProfileModule { }
