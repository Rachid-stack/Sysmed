import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancesEditComponent } from './ordonnances-edit.component';

describe('OrdonnancesEditComponent', () => {
  let component: OrdonnancesEditComponent;
  let fixture: ComponentFixture<OrdonnancesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdonnancesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdonnancesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
