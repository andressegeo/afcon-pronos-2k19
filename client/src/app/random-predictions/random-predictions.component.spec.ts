import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPredictionsComponent } from './random-predictions.component';

describe('RandomPredictionsComponent', () => {
  let component: RandomPredictionsComponent;
  let fixture: ComponentFixture<RandomPredictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomPredictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
