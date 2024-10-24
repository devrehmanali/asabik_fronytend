import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardPageComponent } from './view/dashboard-page/dashboard-page.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { MyProfileModule } from '../dashboard-business-owner/my-profile.module';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InvestComponent } from './components/invest/invest.component';

const pages = [DashboardPageComponent];

const components = [
  CompaniesListComponent,
  CompanyCardComponent,
  CompanyDetailsComponent,
  InvestComponent,
];

@NgModule({
  declarations: [...pages, ...components],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MyProfileModule,
    MatDialogModule,
  ],
  exports: [...components],
})
export class DashboardModule {}
