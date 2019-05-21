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
    try {
      this.firestore.collection('players')
      .doc(userId)
      .update({money: credits});
   } catch (e) {
      throw new Error(e);
   }
   this.addPokemonService.addPokemon(pokemon);
  }
}
