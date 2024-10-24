import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { InvestmentRequestViewComponent } from './views/investment-request-view/investment-request-view.component';
import { AddInvestmentRequestComponent } from './components/add-investment-request/add-investment-request.component';
import { InvestmentRequestRoutingModule } from './investment-request-routing.module';
import { DetailsInvestmentRequestComponent } from './components/details-investment-request/details-investment-request.component';
import { ExtendModalInvestmentRequestComponent } from './components/extend-modal-investment-request/extend-modal-investment-request.component';
import { AcceptedModalInvestmentRequestComponent } from './components/accepted-modal-investment-request/accepted-modal-investment-request.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InstallmentsInvestmentRequestComponent } from './components/installments-investment-request/installments-investment-request.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const components = [
  AddInvestmentRequestComponent,
  DetailsInvestmentRequestComponent,
  InstallmentsInvestmentRequestComponent,
];
const pages = [InvestmentRequestViewComponent];

@NgModule({
  declarations: [
    ...components,
    ...pages,
    ExtendModalInvestmentRequestComponent,
    AcceptedModalInvestmentRequestComponent,
    InstallmentsInvestmentRequestComponent,
  ],
  imports: [
    CommonModule,
    InvestmentRequestRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  exports: [...components, ...pages],
})
export class InvestmentRequestModule {}
