import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BattleService } from './../battle.service';
@Component({
  selector: 'app-battle-info',
  templateUrl: './battle.info.component.html',
  styleUrls: ['./battle.info.component.scss'],
  providers: [BattleService]
})
export class BattleInfoComponent implements OnInit {
  @Input() public pokemonB: any;
  @Input() public pokemonA: any;
  @Input() public health: any;
  @ViewChild('firstLine') public firstProgress: ElementRef;
  @ViewChild('secondLine') public secondProgress: ElementRef;
  public healthA: number = 100;
  public healthB: number = 100;

  constructor(public battleService: BattleService) { }

  public ngOnInit(): void {
  }

  public leftElement(): any {
    this.healthA = Math.round(this.pokemonA.health*100/this.health.aHealth);
    const elementLeft: any = this.firstProgress.nativeElement;
    this.firstProgress.nativeElement.style.setProperty('background-color',`hsla(${this.healthA}, 100%, 50%, 1)`);

    return elementLeft;
  }
  public rightElement(): any {
    this.healthB = Math.round(this.pokemonB.health*100/this.health.bHealth);
    this.secondProgress.nativeElement.style.setProperty('background-color',`hsla(${this.healthB}, 100%, 50%, 1)`);

    return this.secondProgress.nativeElement;
  }
}
