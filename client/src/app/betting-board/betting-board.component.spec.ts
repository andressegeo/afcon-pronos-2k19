import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingBoardComponent } from './betting-board.component';

describe('BettingBoardComponent', () => {
  let component: BettingBoardComponent;
  let fixture: ComponentFixture<BettingBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
