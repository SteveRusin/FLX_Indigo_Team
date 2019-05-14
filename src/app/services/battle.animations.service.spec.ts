import { TestBed } from '@angular/core/testing';

import { BattleAnimationsService } from './battle.animations.service';

describe('BattleAnimationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BattleAnimationsService = TestBed.get(BattleAnimationsService);
    expect(service).toBeTruthy();
  });
});
