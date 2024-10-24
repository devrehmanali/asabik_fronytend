import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaidStatementSurveyModalComponent } from './plaid-statement-survey-modal.component';

describe('PlaidStatementSurveyModalComponent', () => {
  let component: PlaidStatementSurveyModalComponent;
  let fixture: ComponentFixture<PlaidStatementSurveyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaidStatementSurveyModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaidStatementSurveyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
