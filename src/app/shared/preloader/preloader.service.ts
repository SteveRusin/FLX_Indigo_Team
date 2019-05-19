import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class PreloaderService {
  private preloader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public show(): void {
    this.preloader$.next(true);
  }

  public hide(): void {
    this.preloader$.next(false);
  }

  public getStream(): Observable<boolean> {
    return this.preloader$.pipe(delay(0));
  }
}
