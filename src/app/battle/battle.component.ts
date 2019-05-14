import { Component, OnInit, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { BattleService } from '../services/battle.service';
import { Pokemon } from '../models/pokemon.interface';
import { BattleInfoComponent } from '../battle/battle.info/battle.info.component';
import { ToBattleService } from '../services/to-battle.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  providers: [BattleService]
})
export class BattleComponent implements OnInit, OnDestroy {
  public isGameWithBot: boolean = false;
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
  @ViewChild(BattleInfoComponent) public battleInfo: BattleInfoComponent;

  constructor(private battleService: BattleService, private elementRef: ElementRef, private renderer: Renderer2, private toBattle: ToBattleService) {
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
  }

  public currentBasePunch(): void {
    this.isButtons = !this.isButtons;
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
    this.killEvent();
    this.currentPokemonHealth -= this.battleService.basePunch(this.pokemonB, this.pokemonA) * this.punchCoefficient;
  }

  public opponentSpecAttack(): void {
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
    }
    this.currentPokemonHealth = this.pokemonA.health;
    this.opponentPokemonHealth = this.pokemonB.health;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
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
    }
    this.currentPokemonHealth = this.pokemonA.health;
    this.opponentPokemonHealth = this.pokemonB.health;
    this.setProgressLine(this.pokemonA.health, this.pokemonB.health);
  }

  public setProgressLine(currentHealth: number, opponentHealth: number): void {
    const current: number = Math.round(currentHealth * 100 / this.health.aHealth);
    const opponent: number = Math.round(opponentHealth * 100 / this.health.bHealth);
    this.battleInfo.leftElement(current);
    this.battleInfo.rightElement(opponent);
  }

  public counter: number = 0;
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

  public ngOnInit(): void { }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
