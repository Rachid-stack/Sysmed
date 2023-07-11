import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambresAddComponent } from './chambres-add.component';

describe('ChambresAddComponent', () => {
  let component: ChambresAddComponent;
  let fixture: ComponentFixture<ChambresAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChambresAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChambresAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
