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
    ability?: Ability;
    health?: number;
    img?: string;
    specAttack?: SpecAttack;
    type?: string;
    weakness?: string;
    state?: string;
    placeOfPunch?: string;
    placeOfDefence?: string;
  }
