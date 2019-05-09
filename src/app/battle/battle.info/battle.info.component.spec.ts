import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleInfoComponent } from './battle.info.component';

describe('Battle.InfoComponent', () => {
  let component: BattleInfoComponent;
  let fixture: ComponentFixture<BattleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
