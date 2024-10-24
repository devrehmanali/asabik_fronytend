import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyActiveUsersGuard } from 'src/app/core/guards/only-active-users.guard';
import { AuthLayoutComponent } from 'src/app/core/layout/auth-layout/auth-layout.component';
import { Link } from 'src/app/shared/links.const';
import { Page } from 'src/app/shared/page.enum';

const routes: Routes = [
  {
    path: '',
    canActivate: [OnlyActiveUsersGuard],
    children: [
      {
        path: Page.Dashboard,
        loadChildren: () =>
          import('./dashboard-investor/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: Page.MyProfile,
        loadChildren: () =>
          import('./dashboard-business-owner/my-profile.module').then(
            (m) => m.MyProfileModule
          ),
      },
      {
        path: Page.BusinessOwnerProfile,
        loadChildren: () =>
          import('./business-owner-profile/business-owner-profile.module').then(
            (m) => m.BusinessOwnerProfileModule
          ),
      },
      {
        path: Page.PreviewBusinessOwnerProfile,
        loadChildren: () =>
          import(
            './preview-business-owner-profile/preview-business-owner-profile.module'
          ).then((m) => m.PreviewBusinessOwnerProfileModule),
      },
      {
        path: Page.InvestmentRequest,
        loadChildren: () =>
          import('./investment-request/investment-request.module').then(
            (m) => m.InvestmentRequestModule
          ),
      },
      {
        path: Page.MonthlyReport,
        loadChildren: () =>
          import('./monthly-reports/monthly-reports.module').then(
            (m) => m.MonthlyReportsModule
          ),
      },
      {
        path: Page.SettingsBusinessOwner,
        loadChildren: () =>
          import(
            './settings-business-owner/settings-business-owner.module'
          ).then((m) => m.SettingsBusinessOwnerModule),
      },
      {
        path: Page.Investments,
        loadChildren: () =>
          import('./investments/investments.module').then(
            (m) => m.InvestmentsModule
          ),
      },
      {
        path: '**',
        redirectTo: Link.Dashboard,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
