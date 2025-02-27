import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDetailCityPage } from './weather-detail-city.page';

describe('WeatherDetailCityPage', () => {
  let component: WeatherDetailCityPage;
  let fixture: ComponentFixture<WeatherDetailCityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailCityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
