import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokemonInterface } from '../pokemon-interface';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  constructor() { }

  @Input() public pokemon: PokemonInterface;
  @Output() public changedPokemon: EventEmitter<PokemonInterface> = new EventEmitter();

  public select(pokemon: PokemonInterface): void {
    this.changedPokemon.emit(pokemon);
  }

  public ngOnInit(): void {}

}
