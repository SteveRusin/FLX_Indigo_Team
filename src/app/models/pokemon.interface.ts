// export interface Pokemon {
//     name?: string;
//     ability?: { [key: string]: number };
//     health?: number;
//     specAttack?: { [key: string]: number };
//     type?: string;
//     weakness?: string;

// }

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
    state?: string;
  }
