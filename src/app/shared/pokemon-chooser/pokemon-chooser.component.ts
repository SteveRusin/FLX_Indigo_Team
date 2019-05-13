import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CdkStep } from '@angular/cdk/stepper';
import { combineLatest, Observable } from 'rxjs';

import { ToBattleService } from '../../services/to-battle.service';
import { PokemonChooserService } from '../../services/pokemon-chooser.service';

import { BattleComponent } from '../../battle/battle.component';
import { Pokemon } from './pokemon-interface';

@Component({
  selector: 'app-pokemon-chooser',
  templateUrl: './pokemon-chooser.component.html',
  styleUrls: ['./pokemon-chooser.component.scss']
})

export class PokemonChooserComponent implements OnInit {
  public pokemonsList$: Observable<Pokemon[]>;
  public userPokemons$: Observable<Pokemon[]>;
  public selectedPokemon: Pokemon[] = [];

  public isVisible: boolean = true;

  constructor(
    public pokemonChooserService: PokemonChooserService,
    private toBattle: ToBattleService,
    private battle: BattleComponent
    ) {}

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

  public sendPokemons(): void {
    const [userPokemon, opponentPokemon]: Pokemon[] = this.selectedPokemon;
    this.toBattle.sendPokemons({ userPokemon,  opponentPokemon});
    this.battle.startFight();
  }

  public ngOnInit(): void {
    this.userPokemons$ = combineLatest(
      this.pokemonChooserService.getPokemons(),
      this.pokemonChooserService.getUserPokemons(),
      (pokemons: Pokemon[], userPokemons: Pokemon[]): Pokemon[] =>  {
        const names: string[] = userPokemons.map((element: any) => element.payload.doc.id);

        return pokemons.filter((pokemon: Pokemon) => {
          return names.includes(pokemon.name);
        });
      });
    this.pokemonsList$ = this.pokemonChooserService.getPokemons();
  }
}
