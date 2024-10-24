import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfilePageComponent } from './views/my-profile/my-profile.component';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusinessOwnerProfileComponent } from './components/business-owner-profile/business-owner-profile.component';
import { InvestorProfileComponent } from '../dashboard-investor/components/investor-profile/investor-profile.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DeleteInvestorModalComponent } from '../dashboard-investor/components/delete-investor-modal/delete-investor-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

const components = [BusinessOwnerProfileComponent, InvestorProfileComponent];
const pages = [MyProfilePageComponent];

@NgModule({
  declarations: [...components, ...pages, DeleteInvestorModalComponent],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ],
  exports: [...components, ...pages],
})
export class MyProfileModule {}
