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
    if(this.counterArr.indexOf(a.id)!==-1) {
      this.counterArr.push(a.id);

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
    let isId: boolean = true;
    let amountOfId: number = 0;

    for (const id of this.counterArr) {
      if (id === a.id) {
        isId = false;
        amountOfId++;

      }
    }
    if(amountOfId<a.specAttack.moves) {
      amountOfId = 0;
    }
    if (isId || amountOfId > a.specAttack.moves) {
      if(a.specAttack.hasOwnProperty('damage')) {
        b.health -= a.specAttack.damage;
      } else if(a.specAttack.hasOwnProperty('recovery')) {
        a.health+= 500;
      } else if(a.specAttack.hasOwnProperty('defence')) {
        a.health+= 500;
      }

      this.counterArr = this.counterArr.filter((el: string) => {

          return el!==a.id;

      });
      this.counterArr.push(a.id);
      amountOfId = 0;
    }
    console.log(`superpunch is ${b.health}`);

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
