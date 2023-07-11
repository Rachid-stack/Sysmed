import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMedicamentListingComponent } from './base-medicament-listing.component';

describe('BaseMedicamentListingComponent', () => {
  let component: BaseMedicamentListingComponent;
  let fixture: ComponentFixture<BaseMedicamentListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMedicamentListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMedicamentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
