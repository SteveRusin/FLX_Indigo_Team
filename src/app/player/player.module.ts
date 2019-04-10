import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes , RouterModule} from '@angular/router';
import { PlayerComponent } from './player.component';

const routes: Routes = [
  { path: '', component: PlayerComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlayerComponent]
})
export class PlayerModule { }
