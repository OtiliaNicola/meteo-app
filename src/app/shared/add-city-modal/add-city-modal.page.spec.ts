import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCityModalPage } from './add-city-modal.page';

describe('AddCityModalPage', () => {
  let component: AddCityModalPage;
  let fixture: ComponentFixture<AddCityModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
