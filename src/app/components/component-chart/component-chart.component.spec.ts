import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentChartComponent } from './component-chart.component';

describe('ComponentChartComponent', () => {
  let component: ComponentChartComponent;
  let fixture: ComponentFixture<ComponentChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
