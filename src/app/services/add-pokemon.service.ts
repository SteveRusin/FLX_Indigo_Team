import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()

export class AddPokemonService {
  public userPlayer$: Observable<any>;

  constructor(private firestore: AngularFirestore, public authService: AuthService) {}

  public addPokemon(pokemon: any): void {
    const userId: string = this.authService.uid;
    this.firestore.collection('players')
    .doc(userId)
    .collection('pokemons')
    .doc(pokemon.name)
    .set({name: pokemon.name})
    .then(function(): void {
      console.log('Document successfully written!');
    })
    .catch(function(error: any): void {
      console.error('Error writing document: ', error);
    });
  }

  public test(): void {
    console.log('!!!');
  }
}
