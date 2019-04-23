import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CdkStep } from '@angular/cdk/stepper';
import { PokemonInterface } from './pokemon-interface';
import { pokemons } from './pokemon-list';

@Component({
  selector: 'app-pokemon-chooser',
  templateUrl: './pokemon-chooser.component.html',
  styleUrls: ['./pokemon-chooser.component.scss']
})

export class PokemonChooserComponent implements OnInit {

  constructor() {}

  public pokemonsList: PokemonInterface[] = pokemons;
  public selectedPokemon: PokemonInterface[] = [];

  public choosePokemon(pokemon: PokemonInterface, step: CdkStep, stepper: MatStepper): void {
    if(stepper.selectedIndex === 0) {
      this.selectedPokemon[0] = pokemon;
    } else {
      this.selectedPokemon[1] = pokemon;
    }
    if(!step.completed) {
      step.completed = true;
    }
    stepper.next();
  }

  public ngOnInit(): void {}
}
