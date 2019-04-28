import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Pokemon } from '../shared/pokemon-chooser/pokemon-interface';

@Injectable()

export class ToBattleService {

  private subject: any = new Subject<any>();

  constructor() {}

  public sendPokemons(pokemons: Pokemon[]): void {
    this.subject.next(pokemons);
  }

  public getPokemons(): Observable<any> {
    return this.subject.asObservable();
  }
}
