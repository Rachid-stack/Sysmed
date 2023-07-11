import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitsListingComponent } from './lits-listing.component';

describe('LitsListingComponent', () => {
  let component: LitsListingComponent;
  let fixture: ComponentFixture<LitsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
