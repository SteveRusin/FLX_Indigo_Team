import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { PokemonChooserComponent } from './pokemon-chooser.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PokemonChooserComponent, PokemonCardComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule,
    RouterModule.forChild([
    { path: '', component: PokemonChooserComponent }
    ])
  ],
  exports: [PokemonChooserComponent]

})
export class PokemonChooserModule { }
