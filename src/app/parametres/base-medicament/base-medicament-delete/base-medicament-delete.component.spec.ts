import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMedicamentDeleteComponent } from './base-medicament-delete.component';

describe('BaseMedicamentDeleteComponent', () => {
  let component: BaseMedicamentDeleteComponent;
  let fixture: ComponentFixture<BaseMedicamentDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMedicamentDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMedicamentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
