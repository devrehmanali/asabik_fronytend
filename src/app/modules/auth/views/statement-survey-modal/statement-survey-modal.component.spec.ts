import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementSurveyModalComponent } from './statement-survey-modal.component';

describe('StatementSurveyModalComponent', () => {
  let component: StatementSurveyModalComponent;
  let fixture: ComponentFixture<StatementSurveyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatementSurveyModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatementSurveyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
