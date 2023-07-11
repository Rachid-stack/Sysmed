import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsAddSendComponent } from './consultations-add-send.component';

describe('ConsultationsAddSendComponent', () => {
  let component: ConsultationsAddSendComponent;
  let fixture: ComponentFixture<ConsultationsAddSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationsAddSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsAddSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
