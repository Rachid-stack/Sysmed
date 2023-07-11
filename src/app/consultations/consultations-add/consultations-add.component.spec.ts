import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsAddComponent } from './consultations-add.component';

describe('ConsultationsAddComponent', () => {
  let component: ConsultationsAddComponent;
  let fixture: ComponentFixture<ConsultationsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
