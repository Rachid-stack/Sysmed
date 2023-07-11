import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDiagnostiqueListingComponent } from './base-diagnostique-listing.component';

describe('BaseDiagnostiqueListingComponent', () => {
  let component: BaseDiagnostiqueListingComponent;
  let fixture: ComponentFixture<BaseDiagnostiqueListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDiagnostiqueListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDiagnostiqueListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
