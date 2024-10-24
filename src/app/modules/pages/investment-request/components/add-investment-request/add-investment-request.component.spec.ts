import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestmentRequestComponent } from './add-investment-request.component';

describe('AddInvestmentRequestComponent', () => {
  let component: AddInvestmentRequestComponent;
  let fixture: ComponentFixture<AddInvestmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddInvestmentRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddInvestmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
