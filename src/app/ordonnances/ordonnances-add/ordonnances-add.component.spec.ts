import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancesAddComponent } from './ordonnances-add.component';

describe('OrdonnancesAddComponent', () => {
  let component: OrdonnancesAddComponent;
  let fixture: ComponentFixture<OrdonnancesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdonnancesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdonnancesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
