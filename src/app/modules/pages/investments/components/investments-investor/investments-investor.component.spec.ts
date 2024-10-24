import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsInvestorComponent } from './investments-investor.component';

describe('InvestmentsInvestorComponent', () => {
  let component: InvestmentsInvestorComponent;
  let fixture: ComponentFixture<InvestmentsInvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestmentsInvestorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentsInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
