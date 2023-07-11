import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMedicamentAddComponent } from './base-medicament-add.component';

describe('BaseMedicamentAddComponent', () => {
  let component: BaseMedicamentAddComponent;
  let fixture: ComponentFixture<BaseMedicamentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMedicamentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMedicamentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
