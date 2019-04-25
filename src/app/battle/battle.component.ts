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

  @ViewChild('baseButtonCurrent') public baseButtonCurrent: ElementRef;
  @ViewChild('specButtonCurrent') public specButtonCurrent: ElementRef;
  @ViewChild('defenceButtonCurrent') public defenceButtonCurrent: ElementRef;

  @ViewChild('baseButtonOpponent') public baseButtonOpponent: ElementRef;
  @ViewChild('specButtonOpponent') public specButtonOpponent: ElementRef;
  @ViewChild('defenceButtonOpponent') public defenceButtonOpponent: ElementRef;

  @ViewChild('opponentPunch') public opponentPunch: ElementRef;

  constructor(public battleService: BattleService, public elementRef: ElementRef) {
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
    this.setCurrentDisable();
    this.pokemonB.health = this.battleService.basePunch(this.pokemonA, this.pokemonB) + this.rightCornerDefence;
    this.rightCornerDefence = 0;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }
  public currentSpecAttack(): void {
    this.setCurrentDisable();
    this.pokemonB.health = this.battleService.specAttack(this.pokemonA, this.pokemonB);
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }

  public opponentBasePunch(): void {
    this.setOpponentDisable();
    this.pokemonA.health = this.battleService.basePunch(this.pokemonB, this.pokemonA) + this.leftCornerDefence;
    this.leftCornerDefence = 0;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }

  public opponentSpecAttack(): void {
    // check cof
    this.setOpponentDisable();
    this.pokemonA.health = this.battleService.specAttack(this.pokemonB, this.pokemonA);
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }
  public currentDefence(): void {
    this.setCurrentDisable();
    this.leftCornerDefence = this.battleService.setDefence(this.pokemonA, this.pokemonB);
  }
  public opponentDefence(): void {
    this.setOpponentDisable();
    this.rightCornerDefence = this.battleService.setDefence(this.pokemonB, this.pokemonA);
  }

  public setProgressLine(currentHealth: number, opponentHealth: number): void {
    const current: number = Math.round(currentHealth * 100 / this.health.aHealth);
    const opponent: number = Math.round(opponentHealth * 100 / this.health.bHealth);
    const currentLine: any = this.battleInfo.leftElement();
    const opponentLine: any = this.battleInfo.rightElement();
    currentLine.setAttribute('value', current);
    opponentLine.setAttribute('value', opponent);
  }

  public setCurrentDisable(): void {
    this.baseButtonCurrent.nativeElement.style.setProperty('display', 'none');
    this.specButtonCurrent.nativeElement.style.setProperty('display', 'none');
    this.defenceButtonCurrent.nativeElement.setAttribute('class', '');

    setTimeout(() => {
      this.defenceButtonCurrent.nativeElement.setAttribute('class', 'defence-buttons');
    }, 4000);
    this.baseButtonOpponent.nativeElement.style.setProperty('display', '');
    this.specButtonOpponent.nativeElement.style.setProperty('display', '');
    this.defenceButtonOpponent.nativeElement.style.setProperty('display', '');
  }

  public setOpponentDisable(): void {
    this.baseButtonOpponent.nativeElement.style.setProperty('display', 'none');
    this.specButtonOpponent.nativeElement.style.setProperty('display', 'none');
    this.defenceButtonOpponent.nativeElement.setAttribute('class', '');
    setTimeout(() => {
      this.defenceButtonOpponent.nativeElement.setAttribute('class', 'defence-buttons');
    }, 4000);

    this.baseButtonCurrent.nativeElement.style.setProperty('display', '');
    this.specButtonCurrent.nativeElement.style.setProperty('display', '');
    this.defenceButtonCurrent.nativeElement.style.setProperty('display', '');
  }

  public ngOnInit(): void {
  }
}
