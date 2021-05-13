import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentQuestionComponent } from './component-question.component';

describe('ComponentQuestionComponent', () => {
  let component: ComponentQuestionComponent;
  let fixture: ComponentFixture<ComponentQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
