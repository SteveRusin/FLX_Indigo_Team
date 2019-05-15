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
  public selectedPokemon: any = [];

  public isVisible: boolean = true;
  public vsComputer: boolean = false;

  public pokemonList: any = [];

  constructor(
    public pokemonChooserService: PokemonChooserService,
    private toBattle: ToBattleService,
    private battle: BattleComponent
    ) {}

  public playerVsComputer(step: CdkStep, stepper: MatStepper): void {
    this.vsComputer = true;
    this.nextStep(step, stepper);
  }

  public playerVsPlayer(step: CdkStep, stepper: MatStepper): void {
    this.vsComputer = false;
    this.nextStep(step, stepper);
  }

  public nextStep(step: CdkStep, stepper: MatStepper): void {
    if(!step.completed) {
      step.completed = true;
    }
    stepper.next();
  }

  public choosePokemon(pokemon: Pokemon, step: CdkStep, stepper: MatStepper): void {
    this.selectedPokemon[stepper.selectedIndex - 1] = pokemon;
    if(this.vsComputer === true) {
      this.selectedPokemon[1] = this.pokemonList[Math.floor(Math.random() * this.pokemonList.length)];
    }
    this. nextStep(step, stepper);
  }

  public sendPokemons(): void {
    const [userPokemon, opponentPokemon]: Pokemon[] = this.selectedPokemon;
    this.toBattle.sendPokemons(this.vsComputer, { userPokemon,  opponentPokemon });
    this.battle.startFight();
  }

  public ngOnInit(): void {
    this.userPokemons$ = combineLatest(
      this.pokemonChooserService.getPokemons(),
      this.pokemonChooserService.getUserPokemons(),
      (pokemons: Pokemon[], userPokemons: Pokemon[]): Pokemon[] =>  {
        const names: string[] = userPokemons.map((element: any) => element.payload.doc.id);
        this.pokemonList = pokemons;

        return pokemons.filter((pokemon: any) => {
          return names.includes(pokemon.name);
        });
      });
    this.pokemonsList$ = this.pokemonChooserService.getPokemons();
  }
}
