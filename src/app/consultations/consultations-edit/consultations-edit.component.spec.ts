import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsEditComponent } from './consultations-edit.component';

describe('ConsultationsEditComponent', () => {
  let component: ConsultationsEditComponent;
  let fixture: ComponentFixture<ConsultationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
