import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BattleComponent } from './battle.component';
import { BattleInfoComponent } from './battle.info/battle.info.component';

import { gameRoutes } from './battle-routing.module';
import { from } from 'rxjs';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(gameRoutes)],
  declarations: [BattleComponent,BattleInfoComponent]
})
export class BattleModule {}
