import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyProfileModule } from '../pages/dashboard-business-owner/my-profile.module';
import { AdminDashboardPageComponent } from './view/admin-dashboard/admin-dashboard-page.component';
import { AdminCardComponent } from './components/admin-card/admin-card.component';
import { BusinessOwnerListPageComponent } from './view/business-owners-list/business-owner-list-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { InvestorsListPageComponent } from './view/investors-list/investors-list-page.component';
import { InvestorDetailsPageComponent } from './view/investor-details/investor-details-page.component';
import { BusinessOwnerDetailsPageComponent } from './view/business-owner-details/business-owner-details-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateBusinessOwnerDialogComponent } from './components/update-business-owner-dialog/update-business-owner-dialog.component';
import { UpdateInvestorDialogComponent } from './components/update-investor-dialog/update-investor-dialog.component';
import { SettingsComponent } from './view/settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { RatingUpdateComponent } from './view/rating-update/rating-update.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const pages = [
  AdminDashboardPageComponent,
  BusinessOwnerListPageComponent,
  InvestorsListPageComponent,
  InvestorDetailsPageComponent,
  BusinessOwnerDetailsPageComponent,
  SettingsComponent,
  RatingUpdateComponent,
];
const components = [
  AdminCardComponent,
  UpdateBusinessOwnerDialogComponent,
  UpdateInvestorDialogComponent,
];

@NgModule({
  declarations: [...pages, ...components],
  imports: [
    AdminPanelRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MyProfileModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDialogModule,
    MatSlideToggleModule,
    NgxPlaidLinkModule,
    MatTooltipModule,
  ],
  exports: [...components],
})
export class AdminPanelModule {}
