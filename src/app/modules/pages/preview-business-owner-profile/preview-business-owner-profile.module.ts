import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CardPreviewBusinessOwnerProfileComponent } from './components/card-preview-business-owner-profile/card-preview-business-owner-profile.component';
import { PreviewBusinessOwnerProfileViewComponent } from './views/preview-business-owner-profile-view/preview-business-owner-profile-view.component';
import { PreviewBusinessOwnerProfileRoutingModule } from './preview-business-owner-profile-routing.module';

const components = [CardPreviewBusinessOwnerProfileComponent];
const pages = [PreviewBusinessOwnerProfileViewComponent];

@NgModule({
  declarations: [...components, ...pages],
  imports: [
    CommonModule,
    PreviewBusinessOwnerProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ],
  exports: [...components, ...pages],
})
export class PreviewBusinessOwnerProfileModule {}
