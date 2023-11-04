import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesChartsComponent } from './hobbies-charts.component';

describe('HobbiesChartsComponent', () => {
  let component: HobbiesChartsComponent;
  let fixture: ComponentFixture<HobbiesChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbiesChartsComponent]
    });
    fixture = TestBed.createComponent(HobbiesChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
