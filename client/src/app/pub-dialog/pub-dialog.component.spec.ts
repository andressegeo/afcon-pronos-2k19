import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubDialogComponent } from './pub-dialog.component';

describe('PubDialogComponent', () => {
  let component: PubDialogComponent;
  let fixture: ComponentFixture<PubDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
