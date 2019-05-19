import { Battles } from './battles';

export interface Player {
  name: string;
  email: string;
  avatar?: string;
  battles?: Battles;
  uid?: string;
  id?: string;
  money?: number; // @Ruslan
}
