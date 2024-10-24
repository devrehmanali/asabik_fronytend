import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { InvestmentsRoutingModule } from './investments-routing.module';
import { InvestmentsInvestorComponent } from './components/investments-investor/investments-investor.component';
import { InvestmentsViewsComponent } from './views/investments-views/investments-views.component';
import { InvestmentsCardComponent } from './components/investments-card/investments-card.component';
import { InstallmentsInvestorComponent } from './components/installments-investor/installments-investor.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const components = [
  InvestmentsInvestorComponent,
  InstallmentsInvestorComponent,
];
const pages = [InvestmentsViewsComponent];

@NgModule({
  declarations: [
    ...components,
    ...pages,
    InvestmentsCardComponent,
    InstallmentsInvestorComponent,
  ],
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [...components, ...pages],
})
export class InvestmentsModule {}
