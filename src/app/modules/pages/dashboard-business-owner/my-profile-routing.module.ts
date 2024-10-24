import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from 'src/app/shared/page.enum';
import { MyProfilePageComponent } from './views/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MyProfilePageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class MyProfileRoutingModule {}
