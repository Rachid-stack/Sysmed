import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitsAddComponent } from './lits-add.component';

describe('LitsAddComponent', () => {
  let component: LitsAddComponent;
  let fixture: ComponentFixture<LitsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
