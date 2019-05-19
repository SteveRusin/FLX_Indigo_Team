import {
  Component,
  OnInit
} from '@angular/core';
import {
  Observable,
  combineLatest
} from 'rxjs';
import { take } from 'rxjs/operators';
import { ProfileInfoService } from 'src/app/services/profile-info.service';
import { AddPokemonService } from '../services/add-pokemon.service';
import { BuyPokemonService } from '../services/buy-pokemon.service';
import { Pokemon } from '../models/pokemon.interface';
import { Player } from '../models/player';

@Component({
  selector: 'app-pokemon-shop',
  templateUrl: './pokemon-shop.component.html',
  styleUrls: ['./pokemon-shop.component.scss']
})
export class PokemonShopComponent implements OnInit {
  public userPlayer$: Observable<Player>;
  public userPokemons$: Observable<Pokemon[]>;
  public pokemons$: Observable<Pokemon[]>;
  public pokemons: Observable<Pokemon[]>;

  constructor(
    public profileInfoService: ProfileInfoService,
    public addPokemonService: AddPokemonService,
    public buyPokemonService: BuyPokemonService
    ) {
    this.userPlayer$ = profileInfoService.userPlayer$;
    this.userPokemons$ = profileInfoService.userPokemons$;
    this.pokemons$ = profileInfoService.pokemons$;
  }

  public unlockedPokemon(pokemon: Pokemon): void {
    this.userPlayer$.pipe(take(1))
    .subscribe((response: Player) => {
      if(pokemon.unlocked < response.battles.wins) {
        this.addPokemonService.addPokemon(pokemon);
      } else if(pokemon.price < response.money) {
        this.buyPokemonService.writeCredits(response.money - pokemon.price, pokemon);
      }
    });
  }

  public ngOnInit(): void {
    this.pokemons = combineLatest(
      this.pokemons$,
      this.userPokemons$,
      (pokemons: Pokemon[], userPokemons: Pokemon[]): Pokemon[] =>  {
        const names: string[] = userPokemons.map((pokemon: Pokemon) => pokemon.name);
        userPokemons.forEach((pokemon: Pokemon) => {
          pokemon.lock = false;
        });
        const cards: Pokemon[] =  pokemons.filter((pokemon: Pokemon) => {
          if(!names.includes(pokemon.name)) {
            pokemon.lock = true;

            return  pokemon;
          }
        });

        return userPokemons.concat(cards);
     });
  }
}
