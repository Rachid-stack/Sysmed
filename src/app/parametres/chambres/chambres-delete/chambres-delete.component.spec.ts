import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambresDeleteComponent } from './chambres-delete.component';

describe('ChambresDeleteComponent', () => {
  let component: ChambresDeleteComponent;
  let fixture: ComponentFixture<ChambresDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChambresDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChambresDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
