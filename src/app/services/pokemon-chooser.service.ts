import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Pokemon } from '../shared/pokemon-chooser/pokemon-interface';

@Injectable({
  providedIn: 'root'
})

export class PokemonChooserService {
  constructor(private firestore: AngularFirestore) {}

  public getPokemons(): Observable<Pokemon[]> {
    return this.firestore.collection('pokemons')
    .valueChanges();
  }

  public getUserPokemons(): Observable<Pokemon[]> {
    return this.firestore.collection('players')
    .doc('GmMHEYUlsV8fEUBu2ecZ')
    .collection('pokemons')
    .snapshotChanges();
  }
}
