import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BusinessOwnerProfileViewComponent } from './views/business-owner-profile-view/business-owner-profile-view.component';
import { EditBusinessOwnerProfileComponent } from './components/edit-business-owner-profile/edit-business-owner-profile.component';
import { BusinessOwnerProfileRoutingModule } from './business-owner-profile-routing.module';

const components = [EditBusinessOwnerProfileComponent];
const pages = [BusinessOwnerProfileViewComponent];

@NgModule({
  declarations: [...components, ...pages],
  imports: [
    CommonModule,
    BusinessOwnerProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ],
  exports: [...components, ...pages],
})
export class BusinessOwnerProfileModule {}
