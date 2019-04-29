import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
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
  public isVisibleFight: boolean = false;

  @ViewChild(BattleInfoComponent) public battleInfo: BattleInfoComponent;

  @ViewChild('baseButtonCurrent') public baseButtonCurrent: ElementRef;
  @ViewChild('specButtonCurrent') public specButtonCurrent: ElementRef;
  @ViewChild('defenceButtonCurrent') public defenceButtonCurrent: ElementRef;

  @ViewChild('baseButtonOpponent') public baseButtonOpponent: ElementRef;
  @ViewChild('specButtonOpponent') public specButtonOpponent: ElementRef;
  @ViewChild('defenceButtonOpponent') public defenceButtonOpponent: ElementRef;

  @ViewChild('opponentPunch') public opponentPunch: ElementRef;

  constructor(public battleService: BattleService, public elementRef: ElementRef, public renderer: Renderer2) {
  }
  public getSelectedPokemons($event: any): void {
    this.pokemonA = $event[0];
    this.pokemonB = $event[1];
    this.health.aHealth = $event[0].health;
    this.health.bHealth = $event[1].health;
    this.isVisibleFight = true;
  }
  public pokemonA: Pokemon = {
  };
  public pokemonB: Pokemon = {};
  public health: any = {
    aHealth: this.pokemonA.health,
    bHealth: this.pokemonB.health
  };

  public currentBasePunch(): void {
    console.log(this.pokemonA.health, this.pokemonB.health);
    this.pokemonB.health = this.battleService.basePunch(this.pokemonA, this.pokemonB) + this.rightCornerDefence;
    this.rightCornerDefence = 0;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
    console.log(this.pokemonA.health);
    this.setCurrentDisable();

  }
  public currentSpecAttack(): void {
    this.pokemonB.health = this.battleService.specAttack(this.pokemonA, this.pokemonB);
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
    this.setCurrentDisable();
  }

  public opponentBasePunch(): void {
    this.pokemonA.health = this.battleService.basePunch(this.pokemonB, this.pokemonA) + this.leftCornerDefence;
    this.leftCornerDefence = 0;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
    this.setOpponentDisable();
  }

  public opponentSpecAttack(): void {
    // check cof
    this.pokemonA.health = this.battleService.specAttack(this.pokemonB, this.pokemonA);
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
    this.setOpponentDisable();
  }
  public currentDefence(): void {
    this.leftCornerDefence = this.battleService.setDefence(this.pokemonA, this.pokemonB);
    ////this.setCurrentDisable();
  }
  public opponentDefence(): void {
    this.rightCornerDefence = this.battleService.setDefence(this.pokemonB, this.pokemonA);
    ////this.setOpponentDisable();
  }

  public setProgressLine(currentHealth: number, opponentHealth: number): void {
    const current: number = Math.round(currentHealth * 100 / this.health.aHealth);
    const opponent: number = Math.round(opponentHealth * 100 / this.health.bHealth);
    console.log(current,opponent);
    this.battleInfo.leftElement(current);
    this.battleInfo.rightElement(opponent);
  }

  public setCurrentDisable(): void {
    this.renderer.addClass(this.baseButtonCurrent.nativeElement, 'hide-buttons');
    this.renderer.addClass(this.specButtonCurrent.nativeElement, 'hide-buttons');
    this.renderer.removeClass(this.defenceButtonCurrent.nativeElement, 'hide-buttons');
    if (this.battleService.isAlive(this.pokemonB)) {
      setTimeout(() => {
        this.renderer.addClass(this.defenceButtonCurrent.nativeElement, 'hide-buttons');
      }, 2000);
      setTimeout(() => {
        this.renderer.removeClass(this.baseButtonOpponent.nativeElement, 'hide-buttons');
        this.renderer.removeClass(this.specButtonOpponent.nativeElement, 'hide-buttons');
        this.renderer.addClass(this.defenceButtonOpponent.nativeElement, 'hide-buttons');
      }, 4000);
    }
  }

  public setOpponentDisable(): void {
    this.renderer.addClass(this.baseButtonOpponent.nativeElement, 'hide-buttons');
    this.renderer.addClass(this.specButtonOpponent.nativeElement, 'hide-buttons');
    this.renderer.removeClass(this.defenceButtonOpponent.nativeElement, 'hide-buttons');
    if (this.battleService.isAlive(this.pokemonA)) {
      setTimeout(() => {
        this.renderer.addClass(this.defenceButtonOpponent.nativeElement, 'hide-buttons');
      }, 2000);
      setTimeout(() => {
        this.renderer.removeClass(this.baseButtonCurrent.nativeElement, 'hide-buttons');
        this.renderer.removeClass(this.specButtonCurrent.nativeElement, 'hide-buttons');
        this.renderer.addClass(this.defenceButtonCurrent.nativeElement, 'hide-buttons');
      }, 4000);
    }
  }

  public ngOnInit(): void {
  }
}
