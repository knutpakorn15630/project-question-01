import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTotalComponent } from './component-total.component';

describe('ComponentTotalComponent', () => {
  let component: ComponentTotalComponent;
  let fixture: ComponentFixture<ComponentTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
