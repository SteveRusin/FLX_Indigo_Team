import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-chooser',
  templateUrl: './pokemon-chooser.component.html',
  styleUrls: ['./pokemon-chooser.component.scss']
})
export class PokemonChooserComponent implements OnInit {

  constructor() { }
  public pokemons: any = [
    {
      id: 1,
      name: 'Bulbasaur',
      type: [ 'grass', 'poison' ],
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    },
    {
      id: 5,
      name: 'Charmeleon',
      type: [ 'fire' ],
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'
    },
    {
      id: 15,
      name: 'Beedrill',
      type: [ 'bug', 'poison' ],
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png'
    },
    {
      id: 193,
      name: 'Yanma',
      type: [ 'bug', 'flying' ],
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/193.png'
    },
    {
      id: 152,
      name: 'Chikorita',
      type: [ 'grass' ],
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png'
    }
    ];

    public pokemonOne: any = this.pokemons[0];
    public pokemonTwo: any = this.pokemons[0];

    public choosePokemon(id: number, step: any, stepper: any): void {
      stepper.selectedIndex === 0 ?
        this.pokemonOne = this.getPokemon(id) :
        this.pokemonTwo = this.getPokemon(id);
        if(!step.completed) {
          step.completed = true;
        }
        stepper.next();
    }

    public getPokemon(id:number): any {
      return this.pokemons.find((pokemon: any) => pokemon.id === id);
    }

    public fightMessage(): void {
      alert('FIGHT');
    }

    public ngOnInit():void {}
}
