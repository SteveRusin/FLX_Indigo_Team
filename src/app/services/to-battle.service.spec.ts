import { TestBed } from '@angular/core/testing';

import { ToBattleService } from './to-battle.service';

describe('ToBattleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToBattleService = TestBed.get(ToBattleService);
    expect(service).toBeTruthy();
  });
});
