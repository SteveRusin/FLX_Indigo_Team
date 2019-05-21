import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Pokemon } from '../models/pokemon.interface';
import { Player } from '../models/player';

@Injectable()

export class AddPokemonService {
  public userPlayer$: Observable<Player>;

  constructor(private firestore: AngularFirestore, public authService: AuthService) {}

  public addPokemon(pokemon: Pokemon): void {
    const userId: string = this.authService.uid;
    try {
      this.firestore.collection('players')
      .doc(userId)
      .collection('pokemons')
      .doc(pokemon.name)
      .set({name: pokemon.name});
   } catch (e) {
      throw new Error(e);
   }
  }
}
