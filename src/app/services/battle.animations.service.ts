import { Injectable } from '@angular/core';
import { pokemonType } from '../battle/pokeType.enum';

@Injectable({
  providedIn: 'root'
})
export class BattleAnimationsService {

  public isBack: boolean = false;
  private counter: number = 0;

  constructor() { }

  public getPokemonImg(pokeName: string): string {
    if (this.counter === 0) {
      this.changeState();

      return `http://pokestadium.com/sprites/xy/${this.isBack
        ? 'back/' + pokeName
        : pokeName}.gif`;
    } else {
      return `http://pokestadium.com/sprites/xy/${this.isBack
        ? 'back/' + pokeName
        : pokeName}.gif`;
    }
  }

  public changeState(): boolean {
    return this.isBack = !this.isBack;
  }

  public attacked(pokeType: string): void {
    this.attackType(pokemonType['fire']);
    let arr: string[] = Object.values(pokemonType);
    console.log(arr);
    console.log(pokeType);
    for (let type of pokeType) {
      if (pokeType === type) {
        console.log(type);
      } else {
        console.log('nothing');
      }
    }
  }

  public attackType(type: string): void {
    console.log(type);
  }
}
