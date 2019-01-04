import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelsurveyComponent } from './panelsurvey.component';

describe('PanelsurveyComponent', () => {
  let component: PanelsurveyComponent;
  let fixture: ComponentFixture<PanelsurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelsurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
