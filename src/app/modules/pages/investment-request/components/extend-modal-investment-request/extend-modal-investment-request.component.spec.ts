import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendModalInvestmentRequestComponent } from './extend-modal-investment-request.component';

describe('ExtendModalInvestmentRequestComponent', () => {
  let component: ExtendModalInvestmentRequestComponent;
  let fixture: ComponentFixture<ExtendModalInvestmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendModalInvestmentRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendModalInvestmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
