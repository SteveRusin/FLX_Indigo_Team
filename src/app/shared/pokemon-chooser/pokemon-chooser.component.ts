import { Component, OnInit, } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CdkStep } from '@angular/cdk/stepper';
import { Pokemon } from './pokemon-interface';
import { PokemonChooserService } from '../../services/pokemon-chooser.service';

@Component({
  selector: 'app-pokemon-chooser',
  templateUrl: './pokemon-chooser.component.html',
  styleUrls: ['./pokemon-chooser.component.scss']
})

export class PokemonChooserComponent implements OnInit {

  constructor(private pokemonChooserService: PokemonChooserService) {}

  public pokemonsList: Pokemon[] = [];
  public userPokemons: Pokemon[] = [];
  public selectedPokemon: Pokemon[] = [];

  public choosePokemon(pokemon: Pokemon, step: CdkStep, stepper: MatStepper): void {
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

  public filerPokemon(userPokemons: Pokemon[]): void {
    const id: string[] = userPokemons.map((el: any) => el.payload.doc.id);
    this.userPokemons = this.pokemonsList.filter( (el: Pokemon) => {
      return id.includes(el.id);
    });
  }

  public ngOnInit(): void {
    this.pokemonChooserService.getPokemons()
    .subscribe((pokemons: Pokemon[]) => {
      this.pokemonsList = pokemons;
    });

    this.pokemonChooserService.getUserPokemons()
    .subscribe((userPokemons: any) => {
      this.filerPokemon(userPokemons);
    });
  }
}
