import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
        ? "back/" + pokeName
        : pokeName}.gif`;
    } else {
      return `http://pokestadium.com/sprites/xy/${this.isBack
        ? "back/" + pokeName
        : pokeName}.gif`;
    }
  }

  public changeState(): boolean {
    return this.isBack = !this.isBack;
  }

  public attacked(pokeType: string): void {
    switch (pokeType) {
      case 'normal': break;
      case 'fire': break;
      case 'water': break;
      case 'electric': break;
      case 'grass': break;
      case 'ice': break;
      case 'fighting': break;
      case 'poison': break;
      case 'flying': break;
      case 'ground': break;
      case 'psychic': break;
      case 'bug': break;
      case 'rock': break;
      case 'ghost': break;
      case 'dragon': break;
      case 'dark': break;
      case 'steel': break;
      case 'fairy': break;
      default: break;
    }
  }


}
