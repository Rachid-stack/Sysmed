import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambresListingComponent } from './chambres-listing.component';

describe('ChambresListingComponent', () => {
  let component: ChambresListingComponent;
  let fixture: ComponentFixture<ChambresListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChambresListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChambresListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
