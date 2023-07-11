import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambresEditComponent } from './chambres-edit.component';

describe('ChambresEditComponent', () => {
  let component: ChambresEditComponent;
  let fixture: ComponentFixture<ChambresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChambresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChambresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
