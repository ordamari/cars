import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineTypeChartsComponent } from './engine-type-charts.component';

describe('EngineTypeChartsComponent', () => {
  let component: EngineTypeChartsComponent;
  let fixture: ComponentFixture<EngineTypeChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngineTypeChartsComponent]
    });
    fixture = TestBed.createComponent(EngineTypeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
