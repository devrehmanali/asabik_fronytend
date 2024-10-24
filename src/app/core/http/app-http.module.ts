import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorsModule } from './interceptors/http-interceptors.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, HttpInterceptorsModule],
  declarations: [],
  providers: [HttpService],
})
export class AppHttpModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppHttpModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppHttpModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
