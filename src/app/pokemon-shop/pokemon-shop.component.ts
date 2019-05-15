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

@Component({
  selector: 'app-pokemon-shop',
  templateUrl: './pokemon-shop.component.html',
  styleUrls: ['./pokemon-shop.component.scss']
})
export class PokemonShopComponent implements OnInit {
  public userPlayer$: Observable<any>;
  public userPokemons$: Observable<any>;
  public pokemons$: Observable<any>;
  public pokemons: Observable<any>;

  constructor(
    public profileInfoService: ProfileInfoService,
    public addPokemonService: AddPokemonService,
    public buyPokemonService: BuyPokemonService
    ) {
    this.userPlayer$ = profileInfoService.userPlayer$;
    this.userPokemons$ = profileInfoService.userPokemons$;
    this.pokemons$ = profileInfoService.pokemons$;
  }

  public unlockedPokemon(pokemon: any): void {
    this.userPlayer$.pipe(take(1))
    .subscribe((response: any) => {
      if(pokemon.unlocked < response.battles.wins) {
        pokemon.lock = false;
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
      (pokemons: any[], userPokemons: any[]): any =>  {
        const names: string[] = userPokemons.map((pokemon: any) => pokemon.name);
        userPokemons.forEach((pokemon: any) => {
          pokemon.lock = false;
        });

        const cards: any =  pokemons.filter((pokemon: any) => {
          if(!names.includes(pokemon.name)) {
            pokemon.lock = true;

            return  pokemon;
          }
        });

        return userPokemons.concat(cards);
     });
  }
}
