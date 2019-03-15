import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronoDialogComponent } from './prono-dialog.component';

describe('PronoDialogComponent', () => {
  let component: PronoDialogComponent;
  let fixture: ComponentFixture<PronoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
