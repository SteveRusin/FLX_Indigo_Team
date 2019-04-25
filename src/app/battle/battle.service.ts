import { Injectable } from '@angular/core';
import { Pokemon } from './../models/pokemon.interface';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  // type?
  public counterArr: any = [];

  constructor() { }

  public isAlive(pokemon: Pokemon): boolean {
    return pokemon.health > 0;
  }

  public basePunch(a: Pokemon, b: Pokemon): number {

    let currentAbility: number;
    if(this.counterArr.indexOf(a.name)!==-1) {
      this.counterArr.push(a.name);
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
    let isName: boolean = true;
    let amountOfNames: number = 0;

    for (const name of this.counterArr) {
      if (name === a.name) {
        isName = false;
        amountOfNames++;

      }
    }
    if(amountOfNames<a.specAttack.moves) {
      amountOfNames = 0;
    }
    if (isName || amountOfNames > a.specAttack.moves) {
      b.health -= a.specAttack.damage;
      this.counterArr = this.counterArr.filter((el: string) => {

          return el!==a.name;

      });
      this.counterArr.push(a.name);
      amountOfNames = 0;
    }

    return b.health;
  }
  public setDefence(a: Pokemon,b: Pokemon): number {
    // test decision
    let currentAbility:number;
    for (const key in b.ability) {
      if (b.ability.hasOwnProperty(key)) {
        currentAbility = b.ability[key];
      }
    }

    let defence: number= 10 + Math.random() * (currentAbility + 1 - 10);
    defence= Math. floor(defence);
    console.log(defence);

    return  currentAbility - defence;
  }

  public getInfo(pokemon: Pokemon): Pokemon {
    return pokemon;
  }
}
