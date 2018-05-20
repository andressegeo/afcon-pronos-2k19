import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPickerDialogComponent } from './team-picker-dialog.component';

describe('TeamPickerDialogComponent', () => {
  let component: TeamPickerDialogComponent;
  let fixture: ComponentFixture<TeamPickerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPickerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
