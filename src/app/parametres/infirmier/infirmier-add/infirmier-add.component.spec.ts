import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierAddComponent } from './infirmier-add.component';

describe('InfirmierAddComponent', () => {
  let component: InfirmierAddComponent;
  let fixture: ComponentFixture<InfirmierAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfirmierAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
