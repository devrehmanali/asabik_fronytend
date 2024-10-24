import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnerListPageComponent } from './business-owner-list-page.component';

describe('AdminDashboardComponent', () => {
  let component: BusinessOwnerListPageComponent;
  let fixture: ComponentFixture<BusinessOwnerListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessOwnerListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessOwnerListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
