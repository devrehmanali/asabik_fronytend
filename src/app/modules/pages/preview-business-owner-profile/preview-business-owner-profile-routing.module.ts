import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from 'src/app/shared/page.enum';
import { PreviewBusinessOwnerProfileViewComponent } from './views/preview-business-owner-profile-view/preview-business-owner-profile-view.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewBusinessOwnerProfileViewComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class PreviewBusinessOwnerProfileRoutingModule {}
