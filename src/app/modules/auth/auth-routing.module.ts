import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComfiramtionGuard } from 'src/app/core/guards/email-comfirmation.guard';
import { OnlyLoggedInUsersGuard } from 'src/app/core/guards/only-logged-in-users.guard';
import { OnlyNotLoggedInUsersGuard } from 'src/app/core/guards/only-not-logged-in-users.guard';
import { PlaidGuard } from 'src/app/core/guards/plaid.guard';
import { SurveyGuard } from 'src/app/core/guards/survey.guard';
import { Page } from '../../shared/page.enum';
import { BusinessSurveyPageComponent } from './views/business-survey-page/business-survey-page.component';
import { ConfirmEmailPageComponent } from './views/confirm-email-page/confirm-email-page.component';
import { EmailComfirmationPageComponent } from './views/email-comfirmation-page/email-comfirmation-page.component';
import { ForgotPasswordPageComponent } from './views/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { PlaidPageComponent } from './views/plaid-page/plaid-page.component';
import { ResetPasswordPageComponent } from './views/reset-password-page/reset-password-page.component';
import { SingUpPageComponent } from './views/sign-up-page/sign-up-page.component';
import { SurveyPageComponent } from './views/survey-page/survey-page.component';
import { SurveyStatusPageComponent } from './views/survey-status-page/survey-status-page.component';

const routes: Routes = [
  {
    path: Page.LogIn,
    canActivate: [OnlyNotLoggedInUsersGuard],
    component: LoginPageComponent,
  },
  {
    path: Page.SignUp,
    canActivate: [OnlyNotLoggedInUsersGuard],
    component: SingUpPageComponent,
  },
  {
    path: Page.ForgotPassword,
    component: ForgotPasswordPageComponent,
  },
  {
    path: Page.EmailComfirmation,
    canActivate: [OnlyLoggedInUsersGuard, EmailComfiramtionGuard],
    component: EmailComfirmationPageComponent,
  },
  {
    path: Page.Survey,
    canActivate: [OnlyLoggedInUsersGuard, SurveyGuard],
    component: SurveyPageComponent,
  },
  {
    path: Page.SurveyStatus,
    component: SurveyStatusPageComponent,
  },
  {
    path: Page.BusinessSurvey,
    canActivate: [OnlyLoggedInUsersGuard, SurveyGuard],
    component: BusinessSurveyPageComponent,
  },
  {
    path: Page.Plaid,
    canActivate: [OnlyLoggedInUsersGuard, PlaidGuard],
    component: PlaidPageComponent,
  },
  {
    path: Page.ConfirmEmail,
    component: ConfirmEmailPageComponent,
  },
  {
    path: Page.ResetPassword,
    component: ResetPasswordPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
