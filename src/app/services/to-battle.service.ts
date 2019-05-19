import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable()
export class ToBattleService {

  private subject: any = new Subject<any>();
  public battleType: boolean;

  constructor() {}

  public sendPokemons(battleType: boolean, pokemons: any): void {
    this.battleType = battleType;
    this.subject.next(pokemons);
  }

  public getPokemons(): Observable<any> {
    return this.subject.asObservable();
  }
}
