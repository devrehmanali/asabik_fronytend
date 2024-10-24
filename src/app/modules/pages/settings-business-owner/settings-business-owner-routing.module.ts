import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from 'src/app/shared/page.enum';
import { SettingsBusinessOwnerViewComponent } from './views/settings-business-owner-view/settings-business-owner-view.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsBusinessOwnerViewComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class SettingsBusinessOwnerRoutingModule {}
