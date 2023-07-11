import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsListingComponent } from './consultations-listing.component';

describe('ConsultationsListingComponent', () => {
  let component: ConsultationsListingComponent;
  let fixture: ComponentFixture<ConsultationsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
