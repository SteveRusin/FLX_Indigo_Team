import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Pokemon } from '../models/pokemon.interface';
import { Player } from '../models/player';

@Injectable()

export class PokemonChooserService {
  public userPlayer$: Observable<Player>;

  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService
    ) {}

  public getPokemons(): Observable<Pokemon[]> {
    return this.firestore.collection('pokemons')
    .valueChanges()
    .pipe(shareReplay(1));
  }

  public getUserPokemons(): Observable<Pokemon[]> {
    return this.authService.user
      .pipe(
        switchMap((user: Player): Observable<Pokemon[]> => {
          return this.firestore.collection('players')
            .doc(user.uid)
            .collection('pokemons')
            .snapshotChanges();
        })
      );
  }
}
