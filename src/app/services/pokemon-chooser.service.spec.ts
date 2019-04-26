import { TestBed } from '@angular/core/testing';

import { PokemonChooserService } from './pokemon-chooser.service';

describe('PokemonChooserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonChooserService = TestBed.get(PokemonChooserService);
    expect(service).toBeTruthy();
  });
});
