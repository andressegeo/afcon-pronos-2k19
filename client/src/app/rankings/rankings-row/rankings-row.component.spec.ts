import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsRowComponent } from './rankings-row.component';

describe('RankingsRowComponent', () => {
  let component: RankingsRowComponent;
  let fixture: ComponentFixture<RankingsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
