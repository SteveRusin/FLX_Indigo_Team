import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pokemon } from '../pokemon-interface';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  constructor() { }

  @Input() public pokemon: Pokemon;
  @Output() public changedPokemon: EventEmitter<Pokemon> = new EventEmitter();

  public select(pokemon: Pokemon): void {
    this.changedPokemon.emit(pokemon);
  }

  public ngOnInit(): void {}

}