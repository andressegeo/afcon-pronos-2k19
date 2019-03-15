import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultEntryComponent } from './match-result-entry.component';

describe('MatchResultEntryComponent', () => {
  let component: MatchResultEntryComponent;
  let fixture: ComponentFixture<MatchResultEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchResultEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchResultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
