import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitsDeleteComponent } from './lits-delete.component';

describe('LitsDeleteComponent', () => {
  let component: LitsDeleteComponent;
  let fixture: ComponentFixture<LitsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
