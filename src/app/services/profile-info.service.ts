import {
  Observable,
  combineLatest
} from 'rxjs';
import { Injectable } from '@angular/core';
import {
  switchMap,
  shareReplay
} from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData
} from '@angular/fire/firestore';

import { AuthService } from './auth.service';

@Injectable()
export class ProfileInfoService {

  public userPlayer$: Observable<any>;
  public pokemons$: Observable<any>;
  public userPokemons$: Observable<any>;

  constructor(
    public authService: AuthService,
    private db: AngularFirestore
    ) {

    this.userPlayer$ = authService.user
      .pipe(
        switchMap((user: any) => {
          const ref: AngularFirestoreDocument<{}> = this.db.collection('players')
            .doc(user.uid);

          return ref.valueChanges();
        }),
        shareReplay(1)
      );

      this.pokemons$ = this.db.collection('pokemons')
        .valueChanges()
        .pipe(shareReplay(1));

      const userPokemonNames$: Observable<DocumentData[]> = authService.user
        .pipe(
          switchMap((user: any) => {
            return this.db.collection('players')
            .doc(user.uid)
            .collection('pokemons')
            .valueChanges();
          })
        );

      this.userPokemons$ = combineLatest(this.pokemons$, userPokemonNames$,
        (pokemons:any[], nameItems:any) => {
          const names: string[] = nameItems.map((pokemon: any) => pokemon.name);

          return pokemons.filter((pokemon:any) => names.includes(pokemon.name));
        })
      .pipe(shareReplay(1));
  }
}
