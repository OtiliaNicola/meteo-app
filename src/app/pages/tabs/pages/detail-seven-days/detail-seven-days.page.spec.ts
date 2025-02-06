import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailSevenDaysPage } from './detail-seven-days.page';

describe('DetailSevenDaysPage', () => {
  let component: DetailSevenDaysPage;
  let fixture: ComponentFixture<DetailSevenDaysPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSevenDaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
