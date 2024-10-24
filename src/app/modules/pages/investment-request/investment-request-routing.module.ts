import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from 'src/app/shared/page.enum';
import { InvestmentRequestViewComponent } from './views/investment-request-view/investment-request-view.component';
import { DetailsInvestmentRequestComponent } from './components/details-investment-request/details-investment-request.component';
import { InstallmentsInvestmentRequestComponent } from './components/installments-investment-request/installments-investment-request.component';

const routes: Routes = [
  {
    path: '',
    component: InvestmentRequestViewComponent,
  },
  {
    path: `${Page.DetailsInvestmentRequest}/:id`,
    component: DetailsInvestmentRequestComponent,
  },
  {
    path: `${Page.InstallmentsInvestmentRequest}/:id`,
    component: InstallmentsInvestmentRequestComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class InvestmentRequestRoutingModule {}
