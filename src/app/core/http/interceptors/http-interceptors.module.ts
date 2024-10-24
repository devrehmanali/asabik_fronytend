import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenAndRetryAfterFailureInterceptor } from './refresh-token-and-retry-after-failure.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenAndRetryAfterFailureInterceptor,
      multi: true,
    },
  ],
})
export class HttpInterceptorsModule {}
