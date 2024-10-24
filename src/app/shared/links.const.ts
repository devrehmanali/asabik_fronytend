import { Page } from './page.enum';

export const Link = {
  LogIn: `/${Page.Auth}/${Page.LogIn}`,
  SignUp: `/${Page.Auth}/${Page.SignUp}`,
  ForgotPassword: `/${Page.Auth}/${Page.ForgotPassword}`,
  Survey: `/${Page.Auth}/${Page.Survey}`,
  SaurveyStatus: `/${Page.Auth}/${Page.SurveyStatus}`,
  BusinessSaurvey: `/${Page.Auth}/${Page.BusinessSurvey}`,
  Plaid: `/${Page.Auth}/${Page.Plaid}`,
  Welcome: `/${Page.Welcome}`,
  PrivacyPolicy: `/${Page.PrivacyPolicy}`,
  Terms: `/${Page.Terms}`,
  EmailComfirmation: `/${Page.Auth}/${Page.EmailComfirmation}`,
  ConfirmEmail: `/${Page.Auth}/${Page.ConfirmEmail}`,
  MyProfile: `/${Page.Pages}/${Page.MyProfile}`,
  Dashboard: `/${Page.Pages}/${Page.Dashboard}`,
  Investments: `/${Page.Pages}/${Page.Investments}`,
  InstallmentsInvestor: (id: number) =>
    `/${Page.Pages}/${Page.Investments}/${Page.InstallmentsInvestor}/${id}`,
  BusinessOwnerProfile: `/${Page.Pages}/${Page.BusinessOwnerProfile}`,
  PreviewBusinessOwnerProfile: `/${Page.Pages}/${Page.PreviewBusinessOwnerProfile}`,
  InvestmentRequest: `/${Page.Pages}/${Page.InvestmentRequest}`,

  MonthlyReport: `/${Page.Pages}/${Page.MonthlyReport}`,
  SettingsBusinessOwner: `/${Page.Pages}/${Page.SettingsBusinessOwner}`,

  DetailsInvestmentRequest: (id: number) =>
    `/${Page.Pages}/${Page.InvestmentRequest}/${Page.DetailsInvestmentRequest}/${id}`,

  ApplicationDetails: (id: number) =>
    `/${Page.Pages}/${Page.Dashboard}/${Page.ApplicationDetails}/${id}`,
  InstallmentsInvestmentRequest: (id: number) =>
    `/${Page.Pages}/${Page.InvestmentRequest}/${Page.InstallmentsInvestmentRequest}/${id}`,

  AdminPanelDashboard: `/${Page.AdminPanel}/${Page.AdminDashboard}`,
  AdminPanelBusinessOwnersList: `/${Page.AdminPanel}/${Page.AdminPanelBusinessOwners}`,
  AdminPanelInvestorsList: `/${Page.AdminPanel}/${Page.AdminPanelInvestors}`,
  AdminPanelInvestorDetails: (investorId: number) =>
    `/${Page.AdminPanel}/${Page.AdminPanelInvestors}/${investorId}`,
  AdminPanelBusinessOwnerDetails: (businessOwnerId: number) =>
    `/${Page.AdminPanel}/${Page.AdminPanelBusinessOwners}/${businessOwnerId}`,
  BusinessOwnerProfilePreview: `/${Page.Pages}/${Page.Dashboard}/${Page.BusinessOwnerProfilePreview}`,
  SettingsPanel: `/${Page.AdminPanel}/${Page.SettingsPanel}`,
  RatingUpdate: `/${Page.AdminPanel}/${Page.RatingUpdate}`,
};
