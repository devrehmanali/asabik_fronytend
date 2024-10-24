import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { Link } from 'src/app/shared/links.const';
import { InvestorSurvey } from 'src/app/shared/models/investor-survey.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { questionsConst } from './questions.const';
import { MatDialog } from '@angular/material/dialog';
import { StatementSurveyModalComponent } from '../statement-survey-modal/statement-survey-modal.component';
import { PlaidStatementSurveyModalComponent } from '../plaid-statement-survey-modal/plaid-statement-survey-modal.component';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent {
  buttonColor = ButtonColor;
  steps: number = questionsConst.length + 1;
  currentStep: number = 1;
  questions = questionsConst;
  survey: InvestorSurvey = { questions: [], fullName: '' };
  isQualifies: boolean = true;

  form: FormGroup = new FormGroup({
    answer: new FormControl(null, [Validators.required]),
  });

  nameForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
  });
  constructor(
    private router: Router,
    private surveyService: SurveyService,
    private currentUserService: CurrentUserService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.openModal();
  }

  openModal() {
    const dialogRef = this.dialog.open(StatementSurveyModalComponent, {
      maxHeight: '100vh',
    });
  }

  nextStep() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    this.survey.questions[this.currentStep - 1] = {
      question: this.questions[this.currentStep - 1].body,
      answer: this.form.get('answer')?.value,
    };
    this.form.reset();

    if (this.currentStep == this.steps) {
      this.survey.fullName = this.nameForm.get('fullName')?.value;
      this.surveyService.sendIvestorSurvey(this.survey).subscribe({
        next: (data) => {
          this.currentUserService.removeCurrentUser().subscribe();
          this.router.navigate([Link.SaurveyStatus], {
            queryParams: { surveyStatus: data.surveyStatus },
          });
        },
        error: (err) => {
          this.alertService.push({
            message: err.error.message
              ? err.error.message
              : 'Something went wrong',
            type: AlertType.Danger,
          });
          this.currentUserService.removeCurrentUser().subscribe();
          this.router.navigate([Link.LogIn]);
        },
      });
    } else {
      this.currentStep++;
    }
  }

  sendData() {
    this.nameForm.markAllAsTouched();
    this.nameForm.updateValueAndValidity();
    if (this.nameForm.invalid) return;

    this.survey.fullName = this.nameForm.get('fullName')?.value;
    this.surveyService.sendIvestorSurvey(this.survey).subscribe({
      next: (data) => {
        this.currentUserService.removeCurrentUser().subscribe();
        if (data.surveyStatus === 'qualifies') {
          this.openPlaidModal();
        }
        this.router.navigate([Link.SaurveyStatus], {
          queryParams: { surveyStatus: data.surveyStatus },
        });
      },
      error: (err) => {
        this.alertService.push({
          message: err.error.message
            ? err.error.message
            : 'Something went wrong',
          type: AlertType.Danger,
        });
        this.currentUserService.removeCurrentUser().subscribe();
        this.router.navigate([Link.LogIn]);
      },
    });
  }

  openPlaidModal() {
    const dialogRef = this.dialog.open(PlaidStatementSurveyModalComponent, {
      maxHeight: '100vh',
    });
  }
}
