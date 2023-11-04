import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAgeChartsComponent } from './color-age-charts.component';

describe('ColorAgeChartsComponent', () => {
  let component: ColorAgeChartsComponent;
  let fixture: ComponentFixture<ColorAgeChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorAgeChartsComponent]
    });
    fixture = TestBed.createComponent(ColorAgeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
