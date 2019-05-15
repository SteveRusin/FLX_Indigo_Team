import { TestBed } from '@angular/core/testing';

import { AddPokemonService } from './add-pokemon.service';

describe('AddPokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddPokemonService = TestBed.get(AddPokemonService);
    expect(service).toBeTruthy();
  });
});
