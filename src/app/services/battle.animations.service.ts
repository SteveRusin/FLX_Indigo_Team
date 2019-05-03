import { Injectable } from '@angular/core';

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
    switch (pokeType) {
      case 'normal': this.attackType('normal'); break;
      case 'fire': this.attackType('fire'); break;
      case 'water': this.attackType('water'); break;
      case 'electric': this.attackType('electric'); break;
      case 'grass': this.attackType('grass'); break;
      case 'ice': this.attackType('ice'); break;
      case 'fighting': this.attackType('fighting'); break;
      case 'poison': this.attackType('poison'); break;
      case 'flying': this.attackType('flying'); break;
      case 'ground': this.attackType('ground'); break;
      case 'psychic': this.attackType('psychic'); break;
      case 'bug': this.attackType('bug'); break;
      case 'rock': this.attackType('rock'); break;
      case 'ghost': this.attackType('ghost'); break;
      case 'dragon': this.attackType('dragon'); break;
      case 'dark': this.attackType('dark'); break;
      case 'steel': this.attackType('steel'); break;
      case 'fairy': this.attackType('fairy'); break;
      default: this.attackType('no'); break;
    }
  }

  public attackType(type: string): void {
    console.log(type);
  }
}
