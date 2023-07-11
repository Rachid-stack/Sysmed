import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierListingComponent } from './infirmier-listing.component';

describe('InfirmierListingComponent', () => {
  let component: InfirmierListingComponent;
  let fixture: ComponentFixture<InfirmierListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfirmierListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
