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

  public leftElement(current: number): any {
    this.firstProgress.nativeElement.setAttribute('value', current);
    this.firstProgress.nativeElement.style.setProperty('background-color', `hsla(${current}, 100%, 50%, 1)`);
    this.healthA = current;
    //console.log(this.healthA,'------------',this.healthB);
  }
  public rightElement(opponent: number): any {
    this.secondProgress.nativeElement.setAttribute('value', opponent);
    this.secondProgress.nativeElement.style.setProperty('background-color', `hsla(${opponent}, 100%, 50%, 1)`);
    this.healthB = opponent;
    //console.log(this.healthA,'------------',this.healthB);
  }
}
