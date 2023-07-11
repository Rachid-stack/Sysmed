import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDiagnostiqueEditComponent } from './base-diagnostique-edit.component';

describe('BaseDiagnostiqueEditComponent', () => {
  let component: BaseDiagnostiqueEditComponent;
  let fixture: ComponentFixture<BaseDiagnostiqueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDiagnostiqueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDiagnostiqueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
