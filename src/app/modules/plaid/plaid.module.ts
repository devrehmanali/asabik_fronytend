import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlaidLinkComponent } from './components/plaid-link.component';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const components = [PlaidLinkComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPlaidLinkModule,
    SharedModule,
    RouterModule,
  ],
  exports: [...components],
})
export class PlaidModule {}
