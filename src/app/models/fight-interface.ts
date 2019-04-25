import { Pokemon } from './pokemon.interface';

export class Fight {
  public punchCounter: number = 0;
  public isSpecAttack: boolean = true;

  constructor(public pokemonA: Pokemon, public pokemonB: Pokemon) {
  }
  public basePunch(): object {
    let currentAbility: number;
    for (const key in this.pokemonA.ability) {
      if (this.pokemonA.ability.hasOwnProperty(key)) {
        currentAbility = this.pokemonA.ability[key];
      }
    }
    this.pokemonB.health -= currentAbility;
    console.log(`${this.pokemonB.name} health : ${this.pokemonB.health}`);
    if (this.punchCounter === this.pokemonA.specAttack.moves) {
      this.isSpecAttack = true;
      this.punchCounter = 0;
    }
    if (!this.isSpecAttack) {
      this.punchCounter++;
    }

    return {
      health: this.pokemonB.health,
      spec: this.isSpecAttack
    };
  }
  public specAttack(): object {
    if (this.isSpecAttack) {
      this.isSpecAttack = false;
      this.pokemonB.health -= this.pokemonA.specAttack.damage;
      console.log(`${this.pokemonB.name} health : ${this.pokemonB.health}`);

      return {
        health: this.pokemonB.health,
        spec: true
      };
    } else {
      console.log('You dont have spec-attack');

      return {
        health: this.pokemonB.health,
        spec: this.isSpecAttack
      };
    }
  }
}
