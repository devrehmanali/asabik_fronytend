import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Link } from 'src/app/shared/links.const';
import { Page } from 'src/app/shared/page.enum';
import { AdminDashboardPageComponent } from './view/admin-dashboard/admin-dashboard-page.component';
import { BusinessOwnerDetailsPageComponent } from './view/business-owner-details/business-owner-details-page.component';
import { BusinessOwnerListPageComponent } from './view/business-owners-list/business-owner-list-page.component';
import { InvestorDetailsPageComponent } from './view/investor-details/investor-details-page.component';
import { InvestorsListPageComponent } from './view/investors-list/investors-list-page.component';
import { SettingsComponent } from './view/settings/settings.component';
import { RatingUpdateComponent } from './view/rating-update/rating-update.component';

const routes: Routes = [
  {
    path: Page.AdminDashboard,
    data: {
      fluidContainer: true,
    },
    component: AdminDashboardPageComponent,
  },
  {
    path: Page.AdminPanelInvestors,
    component: InvestorsListPageComponent,
  },
  {
    path: `${Page.AdminPanelInvestors}/:id`,
    component: InvestorDetailsPageComponent,
  },
  {
    path: Page.AdminPanelBusinessOwners,
    component: BusinessOwnerListPageComponent,
  },
  {
    path: `${Page.AdminPanelBusinessOwners}/:id`,
    component: BusinessOwnerDetailsPageComponent,
  },
  {
    path: Page.SettingsPanel,
    component: SettingsComponent,
  },
  {
    path: Page.RatingUpdate,
    component: RatingUpdateComponent,
  },
  {
    path: '**',
    redirectTo: Link.AdminPanelDashboard,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
