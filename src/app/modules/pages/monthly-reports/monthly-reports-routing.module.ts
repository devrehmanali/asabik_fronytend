import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from 'src/app/shared/page.enum';
import { MonthlyReportsViewComponent } from './views/monthly-reports-view/monthly-reports-view.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyReportsViewComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class MonthlyReportsRoutingModule {}
