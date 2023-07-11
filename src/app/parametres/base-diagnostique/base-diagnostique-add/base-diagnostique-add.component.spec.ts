import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDiagnostiqueAddComponent } from './base-diagnostique-add.component';

describe('BaseDiagnostiqueAddComponent', () => {
  let component: BaseDiagnostiqueAddComponent;
  let fixture: ComponentFixture<BaseDiagnostiqueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDiagnostiqueAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDiagnostiqueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
