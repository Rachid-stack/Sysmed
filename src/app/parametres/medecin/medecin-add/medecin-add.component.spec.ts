import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinAddComponent } from './medecin-add.component';

describe('MedecinAddComponent', () => {
  let component: MedecinAddComponent;
  let fixture: ComponentFixture<MedecinAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
