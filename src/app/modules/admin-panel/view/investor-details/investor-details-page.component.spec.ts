import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorDetailsPageComponent } from './investor-details-page.component';

describe('AdminDashboardComponent', () => {
  let component: InvestorDetailsPageComponent;
  let fixture: ComponentFixture<InvestorDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestorDetailsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestorDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
