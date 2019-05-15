import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonShopComponent } from './pokemon-shop.component';

describe('PokemonShopComponent', () => {
  let component: PokemonShopComponent;
  let fixture: ComponentFixture<PokemonShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
