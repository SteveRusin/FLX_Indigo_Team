import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes , RouterModule} from '@angular/router';
import { PlayerProfileComponent } from './player-profile.component';

const routes: Routes = [
  { path: '', component: PlayerProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlayerProfileComponent]
})
export class PlayerProfileModule { }
