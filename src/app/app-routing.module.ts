import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyActiveUsersGuard } from './core/guards/only-active-users.guard';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { Link } from './shared/links.const';
import { Page } from './shared/page.enum';
import { PrivacyPolicyPageComponent } from './views/privacy-policy/privacy-policy.component';
import { TermsPageComponent } from './views/terms/terms.component';
import { WelcomePageComponent } from './views/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        data: {
          showLogo: false,
        },
        component: WelcomePageComponent,
      },
      {
        path: Page.Terms,
        data: {
          showLogo: false,
        },
        component: TermsPageComponent,
      },
      {
        path: Page.PrivacyPolicy,
        data: {
          showLogo: false,
        },
        component: PrivacyPolicyPageComponent,
      },
    ],
  },
  {
    path: Page.Auth,
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: Page.Pages,
    canActivate: [OnlyActiveUsersGuard],
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: Page.AdminPanel,
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./modules/admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
  },
  {
    path: '**',
    redirectTo: Link.LogIn,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
