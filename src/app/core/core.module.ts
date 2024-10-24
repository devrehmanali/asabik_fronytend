import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaslModule } from './casl/casl.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AppHttpModule } from './http/app-http.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { MobileBlockerComponent } from './components/mobile-blocker/mobile-blocker.component';

let components = [
  LayoutComponent,
  AuthLayoutComponent,
  NavbarComponent,
  SidenavComponent,
  AdminLayoutComponent,
  AdminSidenavComponent,
  MobileBlockerComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    CaslModule,
    AppHttpModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
  ],
  exports: [...components],
})
export class CoreModule {}
