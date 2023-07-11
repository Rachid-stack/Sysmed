import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancesListingComponent } from './ordonnances-listing.component';

describe('OrdonnancesListingComponent', () => {
  let component: OrdonnancesListingComponent;
  let fixture: ComponentFixture<OrdonnancesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdonnancesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdonnancesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
