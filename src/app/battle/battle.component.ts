import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BattleService } from './battle.service';
import { Pokemon } from '../models/pokemon.interface';
import { BattleInfoComponent } from '../battle/battle.info/battle.info.component';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  providers: [BattleService]
})
export class BattleComponent implements OnInit {
  public title: string = '';
  public leftCornerDefence: number = 0;
  public rightCornerDefence: number = 0;

  @ViewChild(BattleInfoComponent) public battleInfo: BattleInfoComponent;

  constructor(public battleService: BattleService,public elementRef: ElementRef) {
  }
  public pokemonA: Pokemon = {
    name: 'picachu',
    ability: {
      static: 150
    },
    health: 1500,
    specAttack: {
      damage: 650,
      moves: 6
    },
    type: 'electric',
    weakness: 'grass',
  };

  public pokemonB: Pokemon = {
    name: 'bulbosaur',
    ability: {
      chlorophyll: 100
    },
    health: 1200,
    specAttack: {
      damage: 600,
      moves: 6
    },
    type: 'poison',
    weakness: 'fire'
  };
  //test
  public health: any = {
    aHealth: this.pokemonA.health,
    bHealth: this.pokemonB.health
  };

  public currentBasePunch(): void {
    this.pokemonB.health = this.battleService.basePunch(this.pokemonA, this.pokemonB)+this.rightCornerDefence;
    this.rightCornerDefence = 0;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }
  public currentSpecAttack(): void {
    this.pokemonB.health = this.battleService.specAttack(this.pokemonA, this.pokemonB);
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }

  public opponentBasePunch(): void {
    this.pokemonA.health = this.battleService.basePunch(this.pokemonB, this.pokemonA)+this.leftCornerDefence;
    this.leftCornerDefence = 0;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }

  public opponentSpecAttack(): void {
    // check cof
    this.pokemonA.health = this.battleService.specAttack(this.pokemonB, this.pokemonA);
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }
  public currentDefence(): void {

    this.leftCornerDefence = this.battleService.setDefence(this.pokemonA, this.pokemonB);
  }
  public opponentDefence(): void {

    this.rightCornerDefence = this.battleService.setDefence(this.pokemonB, this.pokemonA);
  }

  public setProgressLine(currentHealth: number, opponentHealth: number): void {
    const current: number = Math.round(currentHealth*100/this.health.aHealth);
    const opponent: number = Math.round(opponentHealth*100/this.health.bHealth);
    const currentLine: any =  this.battleInfo.leftElement();
    const opponentLine: any = this.battleInfo.rightElement();
    currentLine.setAttribute('value', current);
    opponentLine.setAttribute('value',opponent);
    }
  public ngOnInit(): void {
  }
}
