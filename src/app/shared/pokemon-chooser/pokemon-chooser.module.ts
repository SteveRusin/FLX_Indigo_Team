import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { PokemonChooserComponent } from './pokemon-chooser.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [PokemonChooserComponent, PokemonCardComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule,
  ],
  exports: [PokemonChooserComponent]

})
export class PokemonChooserModule { }
