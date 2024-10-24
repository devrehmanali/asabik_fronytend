import { from, Observable, Subject } from 'rxjs';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { HttpService } from '../http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenWithExpirationTime } from '../../models/token-with-expiration-time.interface';
import { CurrentUserService } from '../../services/current-user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';

@Injectable()
export class RefreshTokenAndRetryAfterFailureInterceptor
  implements HttpInterceptor
{
  private refreshTokenInProgress = false;
  private tokenRefreshedSubject: Subject<TokenWithExpirationTime> =
    new Subject();
  private tokenRefreshed$: Observable<TokenWithExpirationTime> =
    this.tokenRefreshedSubject.asObservable();

  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpService = this.injector.get(HttpService);

    return next.handle(req).pipe(
      catchError((err) => {
        if (!this.shouldRetry(err)) {
          throw err;
        }
        return this.refreshTokenAndRetry(err).pipe(
          switchMap((token) =>
            from(httpService.getHeaders()).pipe(
              map((newHeaders) => ({ newHeaders, token }))
            )
          ),
          switchMap(({ newHeaders, token }) => {
            return next.handle(
              req.clone({
                headers: newHeaders.set(
                  'Authorization',
                  `Bearer ${token.accessToken}`
                ),
              })
            );
          }),
          catchError((err) => {
            if (err.status == 401) {
              const authService = this.injector.get(AuthService);
              const alertService = this.injector.get(AlertService);
              authService.logout().subscribe();
              // alertService.push({
              //   message: 'Session expired',
              //   type: AlertType.Danger,
              // });
            }
            throw err;
          })
        );
      })
    );
  }

  private shouldRetry(err: HttpErrorResponse | Error): boolean {
    const retryStatuses = [401];
    return (
      err instanceof HttpErrorResponse &&
      retryStatuses.includes(err.status) &&
      err.url != null &&
      err.url.search(/logout|refresh|login/) == -1
    );
  }

  // tslint:disable-next-line:no-any
  private refreshTokenAndRetry(
    error: Error
  ): Observable<TokenWithExpirationTime> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(
          (token) => {
            observer.next(token);
            observer.complete();
          },
          (err) => {
            observer.error(err);
            observer.complete();
          }
        );
      });
    }
    this.refreshTokenInProgress = true;
    const authService = this.injector.get(AuthService);
    const currentUserService = this.injector.get(CurrentUserService);
    const onRefreshTokenFinish = (token: TokenWithExpirationTime) => {
      this.refreshTokenInProgress = false;
      this.tokenRefreshedSubject.next(token);
    };

    return currentUserService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (!currentUser || !currentUser.tokens) {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSubject.error(error);
          throw error;
        }

        return authService.refreshToken().pipe(
          tap(onRefreshTokenFinish),
          catchError((e) => {
            this.refreshTokenInProgress = false;
            this.tokenRefreshedSubject.error(e);
            throw error;
          })
        );
      })
    );
  }
}
