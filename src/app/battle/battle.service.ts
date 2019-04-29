import { Injectable } from '@angular/core';
import { Pokemon } from './../models/pokemon.interface';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  public counterArr: any = [];

  constructor() { }

  public isAlive(pokemon: Pokemon): boolean {
    return pokemon.health > 0;
  }

  public basePunch(a: Pokemon, b: Pokemon): number {

    let currentAbility: number;
    if(this.counterArr.indexOf(a.state)!==-1) {
      this.counterArr.push(a.state);

    }

    for (const key in a.ability) {
      if (a.ability.hasOwnProperty(key)) {
        currentAbility = a.ability[key];
      }
    }
    b.health -= currentAbility;

    return b.health;
  }

  public specAttack(a: Pokemon, b: Pokemon): number {
    let isState: boolean = true;
    let amountOfStates: number = 0;

    for (const state of this.counterArr) {
      if (state === a.state) {
        isState = false;
        amountOfStates++;

      }
    }
    if(amountOfStates<a.specAttack.moves) {
      amountOfStates = 0;
    }
    if (isState|| amountOfStates > a.specAttack.moves) {
      if(a.specAttack.hasOwnProperty('damage')) {
        b.health -= a.specAttack.damage;
      } else if(a.specAttack.hasOwnProperty('recovery')) {
        a.health+= 500;
      } else if(a.specAttack.hasOwnProperty('defence')) {
        a.health+= 500;
      }

      this.counterArr = this.counterArr.filter((el: string) => {

          return el!==a.state;

      });
      this.counterArr.push(a.state);
      amountOfStates = 0;
    }

    return b.health;
  }
  public setDefence(a: Pokemon,b: Pokemon): number {
    let currentAbility:number;
    for (const key in b.ability) {
      if (b.ability.hasOwnProperty(key)) {
        currentAbility = b.ability[key];
      }
    }

    let defence: number= 10 + Math.random() * (currentAbility + 1 - 10);
    defence= Math. floor(defence);

    return  currentAbility - defence;
  }

  public getInfo(pokemon: Pokemon): Pokemon {
    return pokemon;
  }
}
