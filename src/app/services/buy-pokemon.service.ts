import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AddPokemonService } from './add-pokemon.service';
import { Pokemon } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class BuyPokemonService {

  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService,
    public addPokemonService: AddPokemonService
    ) {}

  public writeCredits(credits: number, pokemon: Pokemon): void {
    const userId: string = this.authService.uid;
    this.firestore.collection('players')
    .doc(userId)
    .update({money: credits})
    .then(function(): void {
      console.log('Document successfully written!');
    })
    .catch(function(error: any): void {
      console.error('Error writing document: ', error);
    });
    this.addPokemonService.addPokemon(pokemon);
  }
}
