import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pokemon } from '../shared/pokemon-chooser/pokemon-interface';

@Injectable()

export class PokemonChooserService {
  constructor(private firestore: AngularFirestore) {}

  public getPokemons(): Observable<Pokemon[]> {
    return this.firestore.collection('pokemons')
    .valueChanges();
  }

  public getUserPokemons(): Observable<Pokemon[]> {
    return this.firestore.collection('players')
    .doc('yPx5MPzW6cMZxwAnmqIFrPZJMoE2')
    .collection('pokemons')
    .snapshotChanges();
  }
}
