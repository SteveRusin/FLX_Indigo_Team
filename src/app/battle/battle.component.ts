import { Component, OnInit, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { BattleService } from '../services/battle.service';
import { Pokemon } from '../models/pokemon.interface';
import { BattleInfoComponent } from '../battle/battle.info/battle.info.component';
import { ToBattleService } from '../services/to-battle.service';
import { Subscription } from 'rxjs';

// USE ANIMATIONS SERVICE
import { BattleAnimationsService } from '../services/battle.animations.service';
import { attackAnimation, attackAnimationsA, attackAnimationsB, defenseAnimation } from './animations.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  providers: [BattleService],
  animations: [ attackAnimation, attackAnimationsA, attackAnimationsB, defenseAnimation ]
})
export class BattleComponent implements OnInit, OnDestroy {
  public isGameWithBot: boolean = true;
  public title: string = '';
  public leftCornerDefence: boolean;
  public rightCornerDefence: boolean;
  public isVisibleFight: boolean = false;
  public isDefence: boolean = true;
  public isButtons: boolean = true;
  public isPunchSection: boolean = true;
  public isVoodoo: boolean = true;
  public pokemons: any = {};
  public currentPokemonHealth: number;
  public opponentPokemonHealth: number;
  public subscription: Subscription;
  public killEvent: any;
  public killDefenceEvent: any;
  public punchCoefficient: number = 1;
  private counter: number = 0;

  public aAttack: string;
  public bAttack: string;
  public currentStateA: string = 'initial';
  public currentStateB: string = 'initial';
  public defenseA: string = 'initial';
  public defenseB: string = 'initial';
  private healthCounterA: number = 100;
  private healthCounterB: number = 100;
  private isSpecAttackA: boolean = false;
  private isSpecAttackB: boolean = false;
  private superPunchA: string;
  private superPunchB: string;
  private attackTooltipA: string;
  private attackTooltipB: string;

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

  constructor(private battleService: BattleService, private elementRef: ElementRef, private renderer: Renderer2, private toBattle: ToBattleService,
    public battleAnimationsService: BattleAnimationsService, private _sanitizer: DomSanitizer) {
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
    this.currentPokemonHealth = this.pokemonA.health;
    this.opponentPokemonHealth = this.pokemonB.health;
    this.superPunchA = this.pokemonA.specAttack.name;
    this.superPunchB = this.pokemonB.specAttack.name;
    this.attackTooltipA = this.pokemonA.specAttack.type;
    this.attackTooltipB = this.pokemonB.specAttack.type;

    // USE ANIMATIONS SERVICE
    setTimeout(() => this.getPokemons());
  }

  public bg: SafeStyle;

  public getArena(): SafeStyle {
    const arenaImgArr: string[] = ['arena1.jpg', 'arena2.jpg', 'arena3.jpg', 'arena4.jpg', 'arena5.jpg'];
    const randImg: number = Math.floor(Math.random() * arenaImgArr.length);
    const style: SafeStyle = this._sanitizer.bypassSecurityTrustStyle(`url(../../assets/battle-fields/${arenaImgArr[randImg]})`);

    return style;
  }

    // USE ANIMATIONS SERVICE
  public changeStateA(state: string): void {
    this.currentStateA = 'initial';
    setTimeout(() => this.currentStateA = state);
  }

  public changeStateB(state: string): void {
    this.currentStateB = 'initial';
    setTimeout(() => this.currentStateB = state);
  }

  public changeDefenseA(): void {
    this.defenseA = this.defenseA === 'initial' ? 'final' : 'initial';
  }

  public changeDefenseB(): void {
    this.defenseB = this.defenseB === 'initial' ? 'final' : 'initial';
  }

  public getPokemons(): void {
    this.renderer.setAttribute(this.imgPokemonA.nativeElement, 'src', this.battleAnimationsService.getPokemonImg(this.pokemonA.name));
    this.renderer.setAttribute(this.imgPokemonB.nativeElement, 'src', this.battleAnimationsService.getPokemonImg(this.pokemonB.name));
    this.aAttack = this.pokemonA.type;
    this.bAttack = this.pokemonB.type;
  }

    // END ANIMATIONS SERVICE

  public currentBasePunch(): void {
    this.isButtons = !this.isButtons;
    this.isSpecAttackA = false;
    this.killEvent();
    if (this.isGameWithBot) {
      this.defencePlace('bot');
    }
    this.opponentPokemonHealth -= this.battleService.basePunch(this.pokemonA, this.pokemonB) * this.punchCoefficient;
    if (this.isGameWithBot) {
      this.punchPlace('bot');
      if(this.battleService.isSpecAttack(this.pokemonB)&&this.pokemonB.health !== this.health.bHealth) {
        console.log('bot spec!',this.health.bHealth);
        this.opponentSpecAttack();
      } else {
        this.opponentBasePunch();
      }
    }
  }
  public currentSpecAttack(): void {
    this.isSpecAttackA = true;
    this.killEvent();
    this.isButtons = !this.isButtons;
    if (this.isGameWithBot) {
      this.defencePlace('bot');
    }
    if (this.pokemonA.specAttack.type === 'recovery') {
      this.currentPokemonHealth = this.battleService.specAttack(this.pokemonA, this.pokemonB);
      if (this.currentPokemonHealth >= this.health.aHealth) {
        this.currentPokemonHealth = this.health.aHealth;
      }
    } else {
      this.opponentPokemonHealth = this.battleService.specAttack(this.pokemonA, this.pokemonB);
    }
    if (this.isGameWithBot) {
      this.punchPlace('bot');
      this.opponentBasePunch();
    }
  }

  public opponentBasePunch(): void {
    this.isButtons = !this.isButtons;
    this.isSpecAttackB = false;
    this.killEvent();
    this.currentPokemonHealth -= this.battleService.basePunch(this.pokemonB, this.pokemonA) * this.punchCoefficient;
  }

  public opponentSpecAttack(): void {
    this.isSpecAttackB = true;
    this.killEvent();
    this.isButtons = !this.isButtons;

    if (this.pokemonB.specAttack.type === 'recovery') {
      this.opponentPokemonHealth = this.battleService.specAttack(this.pokemonB, this.pokemonA);
      if (this.opponentPokemonHealth >= this.health.bHealth) {
        this.opponentPokemonHealth = this.health.bHealth;
      }
    } else {
      this.currentPokemonHealth = this.battleService.specAttack(this.pokemonB, this.pokemonA);
    }
  }

  public currentDefence(): void {
    this.killDefenceEvent();
    this.isVoodoo = !this.isVoodoo;
    this.isDefence = !this.isDefence;
    this.leftCornerDefence = this.battleService.setDefence(this.pokemonA, this.pokemonB);

    if (!this.leftCornerDefence) {
      this.pokemonA.health = this.currentPokemonHealth;
      this.pokemonB.health = this.opponentPokemonHealth;
      this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
      // USE ANIMATIONS SERVICE
      if ( this.isSpecAttackB && this.pokemonB.specAttack.type === 'damage') {
        this.changeStateB('final');
        this.battleInfo.showPopup('attack', -this.healthCounterB, 'b');
      } else if ( this.isSpecAttackB && this.pokemonB.specAttack.type === 'recovery'
      || this.pokemonB.specAttack.type === 'defence') {
        this.battleInfo.showPopup('defence', this.healthCounterA, 'a');
        this.changeDefenseB();
      } else {
        this.changeStateB('final');
        this.battleInfo.showPopup('attack', -this.healthCounterB, 'b');
      }
    } else {
      this.currentPokemonHealth = this.pokemonA.health;
      this.opponentPokemonHealth = this.pokemonB.health;
      this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
      // USE ANIMATIONS SERVICE. Opponent defended
      this.battleInfo.showPopup('defence', this.healthCounterB, 'b');
      this.changeDefenseA();
    }
  }
  public opponentDefence(): void {
    this.killDefenceEvent();
    //wtf
    if (!this.isGameWithBot) {
      this.isVoodoo = !this.isVoodoo;
      this.isDefence = !this.isDefence;
    }

    this.rightCornerDefence = this.battleService.setDefence(this.pokemonB, this.pokemonA);

    if (!this.rightCornerDefence) {
      this.pokemonB.health = this.opponentPokemonHealth;
      this.pokemonA.health = this.currentPokemonHealth;
      this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
      // USE ANIMATIONS SERVICE
      if ( this.isSpecAttackA && this.pokemonA.specAttack.type === 'damage') {
        this.changeStateA('final');
        this.battleInfo.showPopup('attack', -this.healthCounterA, 'a');
      } else if ( this.isSpecAttackA && this.pokemonA.specAttack.type === 'recovery'
      || this.pokemonA.specAttack.type === 'defence') {
        this.battleInfo.showPopup('defence', this.healthCounterB, 'b');
        this.changeDefenseA();
      } else {
        this.changeStateA('final');
        this.battleInfo.showPopup('attack', -this.healthCounterA, 'a');
      }
    } else {
      this.currentPokemonHealth = this.pokemonA.health;
      this.opponentPokemonHealth = this.pokemonB.health;
      this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
      // USE ANIMATIONS SERVICE. Opponent defended
      this.battleInfo.showPopup('defence', this.healthCounterA, 'a');
      this.changeDefenseB();
    }
  }

  private a: number = 100;
  private b: number = 100;

  public setProgressLine(currentHealth: number, opponentHealth: number): void {
    const current: number = Math.round(currentHealth * 100 / this.health.aHealth);
    const opponent: number = Math.round(opponentHealth * 100 / this.health.bHealth);
    this.battleInfo.leftElement(current);
    this.battleInfo.rightElement(opponent);

    this.healthCounterA = this.a - opponent;
    this.healthCounterB = this.b - current;
    this.a = opponent;
    this.b = current;
  }

  public punchPlace(whoPunch: string): void {
    if (this.counter > 0) {
      this.killDefenceEvent();
    }
    this.counter++;
    this.isPunchSection = !this.isPunchSection;
    this.isVoodoo = !this.isVoodoo;
    let punchArea: string;
    this.killEvent = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
      punchArea = event.toElement.dataset.area;
      if (whoPunch === 'current') {
        this.pokemonA.placeOfPunch = punchArea;
      } else if (whoPunch === 'opponent') {
        this.pokemonB.placeOfPunch = punchArea;
      }
    });
    if (whoPunch === 'bot') {
      this.pokemonB.placeOfPunch = this.botDefenceAndAttack();
      console.log('bot punch', this.pokemonB.placeOfPunch);
      this.opponentDefence();
      //this.isVoodoo = !this.isVoodoo;
    }
    if (this.counter > 10) {
      this.punchCoefficient = 2;
    }
  }
  public defencePlace(whoPunch: string): void {
    let defenceArea: string;
    this.killDefenceEvent = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
      defenceArea = event.toElement.dataset.area;
      if (whoPunch === 'current') {
        this.pokemonA.placeOfDefence = defenceArea;
        this.currentDefence();
      } else if (whoPunch === 'opponent') {
        this.pokemonB.placeOfDefence = defenceArea;
        this.opponentDefence();
      }
    });
    if (whoPunch === 'bot') {
      this.pokemonB.placeOfDefence = this.botDefenceAndAttack();
      console.log('bot defence', this.pokemonB.placeOfDefence);
      this.opponentDefence();
      this.isVoodoo = !this.isVoodoo;
      this.isDefence = !this.isDefence;
    }
  }
  //generate place of defence and punch
  public botDefenceAndAttack(): string {
    //this.isVoodoo = !this.isVoodoo;
    //this.isDefence = !this.isDefence;
    const random: number = Math.floor(Math.random() * 3) + 1;
    switch (random) {
      case 1:
        return 'topVoodoo';
      case 2:
        return 'middleVoodoo';
      case 3:
        return 'bottomVoodoo';
      default:
    }
  }

  public ngOnInit(): void {
    this.bg = this.getArena();
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
