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

  // public attacked(pokeType: string): void {
  //   const arr: string[] = Object.values(pokemonType);
  //   for (const type of arr) {
  //     if (pokeType === type) {
  //       return this.attackType(pokeType);
  //     } else {
  //       continue;
  //     }
  //   }
  // }

  // public attackType(type: string): void {
  //   console.log(type);
  // }
}
