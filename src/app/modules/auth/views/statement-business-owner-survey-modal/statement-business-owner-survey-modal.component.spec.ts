import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementBusinessOwnerSurveyModalComponent } from './statement-business-owner-survey-modal.component';

describe('StatementBusinessOwnerSurveyModalComponent', () => {
  let component: StatementBusinessOwnerSurveyModalComponent;
  let fixture: ComponentFixture<StatementBusinessOwnerSurveyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatementBusinessOwnerSurveyModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      StatementBusinessOwnerSurveyModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
