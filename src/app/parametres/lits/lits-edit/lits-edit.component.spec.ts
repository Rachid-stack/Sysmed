import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitsEditComponent } from './lits-edit.component';

describe('LitsEditComponent', () => {
  let component: LitsEditComponent;
  let fixture: ComponentFixture<LitsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
