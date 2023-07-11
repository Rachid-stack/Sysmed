import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMedicamentEditComponent } from './base-medicament-edit.component';

describe('BaseMedicamentEditComponent', () => {
  let component: BaseMedicamentEditComponent;
  let fixture: ComponentFixture<BaseMedicamentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMedicamentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMedicamentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
