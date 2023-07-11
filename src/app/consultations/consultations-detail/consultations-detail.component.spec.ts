import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsDetailComponent } from './consultations-detail.component';

describe('ConsultationsDetailComponent', () => {
  let component: ConsultationsDetailComponent;
  let fixture: ComponentFixture<ConsultationsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
