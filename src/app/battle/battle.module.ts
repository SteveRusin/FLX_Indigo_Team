import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BattleComponent } from './battle.component';
import { BattleInfoComponent } from './battle.info/battle.info.component';
import { gameRoutes } from './battle-routing.module';
import { PokemonChooserModule } from '../shared/pokemon-chooser/pokemon-chooser.module';
import { MatCardModule, MatButtonModule, MatTooltipModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(gameRoutes),PokemonChooserModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule
  ],
  declarations: [BattleComponent,BattleInfoComponent],
})

export class BattleModule {}
