import { Component, OnInit, ElementRef, ViewChild, Renderer2, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BattleService } from './battle.service';
import { Pokemon } from '../models/pokemon.interface';
import { BattleInfoComponent } from '../battle/battle.info/battle.info.component';
import { ToBattleService } from '../services/to-battle.service';
import { Subscription } from 'rxjs';

import { BattleAnimationsService } from '../services/battle.animations.service';
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  providers: [BattleService]
})
export class BattleComponent implements OnInit, OnDestroy {
  public title: string = '';
  public leftCornerDefence: number = 0;
  public rightCornerDefence: number = 0;
  public isVisibleFight: boolean = false;
  public pokemons: any = {};
  public subscription: Subscription;

  public aAttack: string;
  public bAttack: string;

  @ViewChild(BattleInfoComponent) public battleInfo: BattleInfoComponent;

  @ViewChild('baseButtonCurrent') public baseButtonCurrent: ElementRef;
  @ViewChild('specButtonCurrent') public specButtonCurrent: ElementRef;
  @ViewChild('defenceButtonCurrent') public defenceButtonCurrent: ElementRef;

  @ViewChild('baseButtonOpponent') public baseButtonOpponent: ElementRef;
  @ViewChild('specButtonOpponent') public specButtonOpponent: ElementRef;
  @ViewChild('defenceButtonOpponent') public defenceButtonOpponent: ElementRef;
  @ViewChild('opponentPunch') public opponentPunch: ElementRef;

  @ViewChild('imgPokemonA') public imgPokemonA: ElementRef;
  @ViewChild('imgPokemonB') public imgPokemonB: ElementRef;

  constructor(public battleService: BattleService, public elementRef: ElementRef, public renderer: Renderer2, private toBattle: ToBattleService, public battleAnimationsService: BattleAnimationsService) {
    this.subscription = this.toBattle.getPokemons()
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      });
  }
  public pokemonA: Pokemon = {};
  public pokemonB: Pokemon = {};
  public health: any = {
    aHealth: this.pokemonA.health,
    bHealth: this.pokemonB.health
  };
  public startFight(): void {
    this.pokemonA = { ...this.pokemons.userPokemon };
    this.pokemonB = { ...this.pokemons.opponentPokemon };
    this.health.aHealth = this.pokemons.userPokemon.health;
    this.health.bHealth = this.pokemons.opponentPokemon.health;
    this.pokemonA.state = 'current';
    this.pokemonB.state = 'opponent';
    this.isVisibleFight = true;

    setTimeout(() => {
      this.getPokemons();
    }, 1000);
  }

  public getPokemons(): void {
    this.renderer.setAttribute(this.imgPokemonA.nativeElement, 'src', this.battleAnimationsService.getPokemonImg(this.pokemonA.name));
    this.renderer.setAttribute(this.imgPokemonB.nativeElement, 'src', this.battleAnimationsService.getPokemonImg(this.pokemonB.name));
  }

  public currentBasePunch(): void {
    this.pokemonB.health = this.battleService.basePunch(this.pokemonA, this.pokemonB) + this.rightCornerDefence;
    this.rightCornerDefence = 0;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
    this.setCurrentDisable();

    this.battleAnimationsService.attacked(this.pokemonA.type);
    this.aAttack = this.pokemonA.type;
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
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
