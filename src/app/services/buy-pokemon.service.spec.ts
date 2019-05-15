import { TestBed } from '@angular/core/testing';

import { BuyPokemonService } from './buy-pokemon.service';

describe('BuyPokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyPokemonService = TestBed.get(BuyPokemonService);
    expect(service).toBeTruthy();
  });
});
