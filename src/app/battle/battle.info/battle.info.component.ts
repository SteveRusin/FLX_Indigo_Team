import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BattleService } from './../battle.service';
import { popupAnimationDamage, popupAnimationDefence } from './info-animations.service';
@Component({
  selector: 'app-battle-info',
  templateUrl: './battle.info.component.html',
  styleUrls: ['./battle.info.component.scss'],
  providers: [BattleService],
  animations: [ popupAnimationDamage, popupAnimationDefence ],
})
export class BattleInfoComponent implements OnInit {
  @Input() public pokemonB: any;
  @Input() public pokemonA: any;
  @Input() public health: any;
  @ViewChild('firstLine') public firstProgress: ElementRef;
  @ViewChild('secondLine') public secondProgress: ElementRef;
  public healthA: number = 100;
  public healthB: number = 100;

  // USE ANIMATIONS
  public attackPopupA: string = 'initial';
  public attackPopupB: string = 'initial';
  public defencePopupA: string = 'initial';
  public defencePopupB: string = 'initial';
  public attack: string;
  public attackStrength: number;

  constructor(public battleService: BattleService) { }

  public ngOnInit(): void {
  }

  public leftElement(current: number): any {
    this.firstProgress.nativeElement.setAttribute('value', current);
    this.firstProgress.nativeElement.style.setProperty('background-color', `hsla(${current}, 100%, 50%, 1)`);
    this.healthA = current;
  }
  public rightElement(opponent: number): any {
    this.secondProgress.nativeElement.setAttribute('value', opponent);
    this.secondProgress.nativeElement.style.setProperty('background-color', `hsla(${opponent}, 100%, 50%, 1)`);
    this.healthB = opponent;
  }

  // USE ANIMATIONS
  public showAttackAndPopupA(type: string): void {
    if (type === 'punch') {
      this.attackPopupA = this.attackPopupA === 'initial' ? 'final' : 'initial';
    } else {
      this.defencePopupB = this.defencePopupB === 'initial' ? 'final' : 'initial';
    }
  }

  public showAttackAndPopupB(type: string): void {
    if (type === 'punch') {
      this.attackPopupB = this.attackPopupB === 'initial' ? 'final' : 'initial';
    } else {
      this.defencePopupA = this.defencePopupA === 'initial' ? 'final' : 'initial';
    }
  }

  public showPopup(val: string, strength: number, a: string): void {
    if (val === 'attack') {
      this.attack = 'Punch';
      this.attackStrength = strength;
      if (a === 'a') {
        this.showAttackAndPopupB('punch');
      } else {
        this.showAttackAndPopupA('punch');
      }
    } else if (val === 'specAttack') {
      this.attack = 'Super punch';
      this.attackStrength = strength;
      if (a === 'a') {
        this.showAttackAndPopupB('punch');
      } else {
        this.showAttackAndPopupA('punch');
      }
    } else {
      this.attack = 'Defence';
      this.attackStrength = strength;
      if (a === 'a') {
        this.showAttackAndPopupB('defence');
      } else {
        this.showAttackAndPopupA('defence');
      }
    }
  }

}
