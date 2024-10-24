import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SingUpPageComponent } from './views/sign-up-page/sign-up-page.component';
import { ForgotPasswordPageComponent } from './views/forgot-password-page/forgot-password-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyPageComponent } from './views/survey-page/survey-page.component';
import { SurveyStatusPageComponent } from './views/survey-status-page/survey-status-page.component';
import { BusinessSurveyPageComponent } from './views/business-survey-page/business-survey-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { PlaidPageComponent } from './views/plaid-page/plaid-page.component';
import { PlaidModule } from '../plaid/plaid.module';
import { EmailComfirmationPageComponent } from './views/email-comfirmation-page/email-comfirmation-page.component';
import { ConfirmEmailPageComponent } from './views/confirm-email-page/confirm-email-page.component';
import { ResetPasswordPageComponent } from './views/reset-password-page/reset-password-page.component';
import { MatSelectModule } from '@angular/material/select';
import { StatementSurveyModalComponent } from './views/statement-survey-modal/statement-survey-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PlaidStatementSurveyModalComponent } from './views/plaid-statement-survey-modal/plaid-statement-survey-modal.component';
import { StatementBusinessOwnerSurveyModalComponent } from './views/statement-business-owner-survey-modal/statement-business-owner-survey-modal.component';

const pages = [
  LoginPageComponent,
  SingUpPageComponent,
  ForgotPasswordPageComponent,
  SurveyPageComponent,
  SurveyStatusPageComponent,
  BusinessSurveyPageComponent,
  PlaidPageComponent,
  EmailComfirmationPageComponent,
  ConfirmEmailPageComponent,
  ResetPasswordPageComponent,
];
const components = [LoginComponent, SignUpComponent];

@NgModule({
  declarations: [
    ...pages,
    ...components,
    StatementSurveyModalComponent,
    PlaidStatementSurveyModalComponent,
    StatementBusinessOwnerSurveyModalComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    PlaidModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ],
  exports: [],
})
export class AuthModule {}
