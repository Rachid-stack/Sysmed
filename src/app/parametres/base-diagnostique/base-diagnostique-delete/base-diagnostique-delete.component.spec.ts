import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDiagnostiqueDeleteComponent } from './base-diagnostique-delete.component';

describe('BaseDiagnostiqueDeleteComponent', () => {
  let component: BaseDiagnostiqueDeleteComponent;
  let fixture: ComponentFixture<BaseDiagnostiqueDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDiagnostiqueDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDiagnostiqueDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
