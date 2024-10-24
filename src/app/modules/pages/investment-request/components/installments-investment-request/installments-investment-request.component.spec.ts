import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsInvestmentRequestComponent } from './installments-investment-request.component';

describe('InstallmentsInvestmentRequestComponent', () => {
  let component: InstallmentsInvestmentRequestComponent;
  let fixture: ComponentFixture<InstallmentsInvestmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallmentsInvestmentRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstallmentsInvestmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
