import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnerDetailsPageComponent } from './business-owner-details-page.component';

describe('BusinessOwnerDetailsPageComponent', () => {
  let component: BusinessOwnerDetailsPageComponent;
  let fixture: ComponentFixture<BusinessOwnerDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessOwnerDetailsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessOwnerDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
