import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener
} from '@angular/core';
import {
  pokemonType,
  background
} from '../cards-backgrounds';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent implements OnInit {
  public objectKeys: any = Object.keys;
  public objectValues: any = Object.values;

  constructor() {}
  @Input() public pokemon: any;
  @Output() public choseCard: EventEmitter<any> = new EventEmitter();

  @Output() public buyCard: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  private emmitPokemon():void {
    this.choseCard.emit(this.pokemon);
  }

  public buyPokemon(pokemon: any): void {
    this.buyCard.emit(pokemon);
  }

  public setStyle(type: any): any {
    const gradient: string = 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4))';
    const map: any = new Map<pokemonType, background>([
      [pokemonType.fire, background.fire],
      [pokemonType.water, background.water],
      [pokemonType.grass, background.grass],
      [pokemonType.electric, background.electric],
      [pokemonType.poison, background.poison],
    ]);

    return { 'background-image': `${gradient}, url(${map.get(type)})` };
  }

  public changePosition(pokemon: any):void {
    pokemon.position = !pokemon.position;
  }

  public selectCard(pokemon: any): void {
    this.choseCard.emit(pokemon);
  }

  public ngOnInit(): void {}

}
