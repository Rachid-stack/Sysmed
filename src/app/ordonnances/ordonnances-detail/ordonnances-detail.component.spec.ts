import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancesDetailComponent } from './ordonnances-detail.component';

describe('OrdonnancesDetailComponent', () => {
  let component: OrdonnancesDetailComponent;
  let fixture: ComponentFixture<OrdonnancesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdonnancesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdonnancesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
