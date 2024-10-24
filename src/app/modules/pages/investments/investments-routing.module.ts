import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from 'src/app/shared/page.enum';
import { InvestmentsInvestorComponent } from './components/investments-investor/investments-investor.component';
import { InstallmentsInvestorComponent } from './components/installments-investor/installments-investor.component';

const routes: Routes = [
  {
    path: '',
    component: InvestmentsInvestorComponent,
  },
  {
    path: `${Page.InstallmentsInvestor}/:id`,
    component: InstallmentsInvestorComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class InvestmentsRoutingModule {}
