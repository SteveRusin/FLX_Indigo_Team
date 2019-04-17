import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonChooserComponent } from './pokemon-chooser.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PokemonChooserComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule,
  ],
  exports: [PokemonChooserComponent]

})
export class PokemonChooserModule { }
