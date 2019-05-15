import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatStepperModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material/';
import { PokemonChooserComponent } from './pokemon-chooser.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { SharedModule } from '../shared.module';
//import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PokemonChooserComponent, PokemonCardComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
    // RouterModule.forChild([
    // { path: '', component: PokemonChooserComponent }
    // ])
  ],
  exports: [PokemonChooserComponent]
})
export class PokemonChooserModule { }
