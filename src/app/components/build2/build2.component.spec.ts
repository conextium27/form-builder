import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Build2Component } from './build2.component';

describe('Build2Component', () => {
  let component: Build2Component;
  let fixture: ComponentFixture<Build2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Build2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Build2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
