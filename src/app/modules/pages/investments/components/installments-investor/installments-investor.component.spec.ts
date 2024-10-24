import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsInvestorComponent } from './installments-investor.component';

describe('InstallmentsInvestorComponent', () => {
  let component: InstallmentsInvestorComponent;
  let fixture: ComponentFixture<InstallmentsInvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallmentsInvestorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstallmentsInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
