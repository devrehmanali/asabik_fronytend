import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInvestmentRequestComponent } from './details-investment-request.component';

describe('DetailsInvestmentRequestComponent', () => {
  let component: DetailsInvestmentRequestComponent;
  let fixture: ComponentFixture<DetailsInvestmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsInvestmentRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsInvestmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
