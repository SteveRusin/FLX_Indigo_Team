export interface Pokemons {
  userPokemon: Pokemon;
  opponentPokemon: Pokemon;
}

export interface SpecAttack {
  move?: number;
  type: string;
  [key: string]: any;
}

export interface Ability {
  [key: string]: number;
}

export interface Pokemon {
  id?: string;
  name?: string;
  ability?: SpecAttack;
  health?: number;
  img?: string;
  specAttack?: SpecAttack;
  type?: string;
  weakness?: string;
}
