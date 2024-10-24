import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsBusinessOwnerRoutingModule } from './settings-business-owner-routing.module';
import { DeleteBusinessOwnerComponent } from './components/delete-business-owner/delete-business-owner.component';
import { SettingsBusinessOwnerViewComponent } from './views/settings-business-owner-view/settings-business-owner-view.component';
import { DeleteBusienessOwnerModalComponent } from './components/delete-busieness-owner-modal/delete-busieness-owner-modal.component';

const components = [DeleteBusinessOwnerComponent];
const pages = [SettingsBusinessOwnerViewComponent];

@NgModule({
  declarations: [...components, ...pages, DeleteBusienessOwnerModalComponent],
  imports: [
    CommonModule,
    SettingsBusinessOwnerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ],
  exports: [...components, ...pages],
})
export class SettingsBusinessOwnerModule {}
