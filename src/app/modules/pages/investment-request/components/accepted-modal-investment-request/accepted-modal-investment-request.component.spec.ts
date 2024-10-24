import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedModalInvestmentRequestComponent } from './accepted-modal-investment-request.component';

describe('AcceptedModalInvestmentRequestComponent', () => {
  let component: AcceptedModalInvestmentRequestComponent;
  let fixture: ComponentFixture<AcceptedModalInvestmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptedModalInvestmentRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptedModalInvestmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
