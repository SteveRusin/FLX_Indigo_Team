import { Injectable } from '@angular/core';
import { Pokemon } from './../models/pokemon.interface';

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
    let result: number;
    if (this.counterArr.indexOf(a.state) !== -1) {
      this.counterArr.push(a.state);
    }
    currentAbility = this.getValOfObj(a.ability);
    const random: number = this.generateRandom(currentAbility);
    result = b.health - random;

    return result;
  }

  public specAttack(a: Pokemon, b: Pokemon): number {
    if (this.isSpecAttack(a)) {
      this.counterArr = this.counterArr.filter((el: string) => {
        return el !== a.state;
      });
      this.counterArr.push(a.state);
      if (a.specAttack.type === 'damage') {
        return b.health - this.generateRandom(a.specAttack.points);
      } else if (a.specAttack.type ==='recovery') {
        return a.health + this.generateRandom(a.specAttack.points);
      } else if (a.specAttack.type ==='defence') {
        return a.health + this.generateRandom(a.specAttack.points);
      }
    }

  }

  public setDefence(a: Pokemon, b: Pokemon): boolean {
    return a.placeOfDefence === b.placeOfPunch ? true : false;
  }

  public isSpecAttack(pokemon: Pokemon): boolean {

    let isState: boolean = true;
    let amountOfStates: number = 0;

    for (const state of this.counterArr) {
      if (state === pokemon.state) {
        isState = false;
        amountOfStates++;

      }
    }
    if (amountOfStates > pokemon.specAttack.moves || isState) {
      return true;
    }

    return false;

  }
  public generateRandom(arg: number): number {
    return Math.floor(Math.random() * ((arg/100*125) - (arg/100*75)  + 1)) + arg/100*75;
  }

  public getValOfObj(obj: object): number {
    let currentValue: number;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        currentValue = obj[key];
      }
    }

    return currentValue;
  }
}
