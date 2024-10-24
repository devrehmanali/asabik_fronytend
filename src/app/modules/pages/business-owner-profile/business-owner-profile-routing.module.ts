import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from 'src/app/shared/page.enum';
import { BusinessOwnerProfileViewComponent } from './views/business-owner-profile-view/business-owner-profile-view.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessOwnerProfileViewComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class BusinessOwnerProfileRoutingModule {}
