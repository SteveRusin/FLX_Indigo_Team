import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Pokemon } from '../shared/pokemon-chooser/pokemon-interface';

@Injectable()

export class PokemonChooserService {
  public userPlayer$: Observable<any>;

  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService
    ) {}

  public getPokemons(): Observable<Pokemon[]> {
    return this.firestore.collection('pokemons')
    .valueChanges();
  }

  public getUserPokemons(): any {
    return this.authService.user
      .pipe(
        switchMap((user: any): any => {
          return this.firestore.collection('players')
            .doc(user.uid)
            .collection('pokemons')
            .snapshotChanges();
        })
      );
  }
}
