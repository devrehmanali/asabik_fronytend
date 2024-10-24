import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { EditMonthlyReportsComponent } from './components/edit-monthly-reports/edit-monthly-reports.component';
import { MonthlyReportsViewComponent } from './views/monthly-reports-view/monthly-reports-view.component';
import { MonthlyReportsRoutingModule } from './monthly-reports-routing.module';

const components = [EditMonthlyReportsComponent];
const pages = [MonthlyReportsViewComponent];

@NgModule({
  declarations: [...components, ...pages],
  imports: [
    CommonModule,
    MonthlyReportsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ],
  exports: [...components, ...pages],
})
export class MonthlyReportsModule {}
