import { Component, OnInit, } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CdkStep } from '@angular/cdk/stepper';
import { Pokemon } from './pokemon-interface';
import { PokemonChooserService } from '../../services/pokemon-chooser.service';
import { ToBattleService } from '../../services/to-battle.service';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-chooser',
  templateUrl: './pokemon-chooser.component.html',
  styleUrls: ['./pokemon-chooser.component.scss']
})

export class PokemonChooserComponent implements OnInit {

  constructor(private pokemonChooserService: PokemonChooserService, private toBattle: ToBattleService) {}

  public selectedPokemon: Pokemon[] = [];

  public pokemonsList$: Observable<Pokemon[]>;
  public userPokemons$: Observable<Pokemon[]>;

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
  }

  public ngOnInit(): void {
    this.userPokemons$ = combineLatest(
      this.pokemonChooserService.getPokemons(),
      this.pokemonChooserService.getUserPokemons(),
      (pokemons: Pokemon[], userPokemons: Pokemon[]): Pokemon[] =>  {
        const id: string[] = userPokemons.map((el: any) => el.payload.doc.id);

        return pokemons.filter((el: Pokemon) => {
          return id.includes(el.id);
       });
     });
     this.pokemonsList$ = this.pokemonChooserService.getPokemons();
  }
}
