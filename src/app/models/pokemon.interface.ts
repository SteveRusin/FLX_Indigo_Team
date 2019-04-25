export interface Pokemon {
    name?: string;
    ability?: { [key: string]: number };
    health?: number;
    specAttack?: { [key: string]: number };
    type?: string;
    weakness?: string;

}
