import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomePageComponent } from './views/welcome-page/welcome-page.component';
import { TermsPageComponent } from './views/terms/terms.component';
import { PrivacyPolicyPageComponent } from './views/privacy-policy/privacy-policy.component';
import { ModalManualProcessingComponent } from './modules/admin-panel/view/modal-manual-processing/modal-manual-processing.component';

const pages = [
  WelcomePageComponent,
  PrivacyPolicyPageComponent,
  TermsPageComponent,
];

@NgModule({
  declarations: [AppComponent, ...pages, ModalManualProcessingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
