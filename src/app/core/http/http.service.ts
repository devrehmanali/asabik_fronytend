import {
  BehaviorSubject,
  EMPTY,
  from,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { HttpErrorHandlerType } from './models/http-error-handler-type.interface';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Config } from 'src/app/config';
import { ResponseData } from './models/response-data.interface';
import { HttpRequestOptions } from './models/http-request-options.interface';
import { CurrentUserService } from '../services/current-user.service';

@Injectable()
export class HttpService {
  static isHttpStatusCode(
    error: Error,
    statusCode: number | number[]
  ): boolean {
    const statuses = Array.isArray(statusCode) ? statusCode : [statusCode];
    return (
      error instanceof HttpErrorResponse && statuses.includes(error.status)
    );
  }

  private static normalizeResponse<T = any>(body: ResponseData): T {
    if (body === null || typeof body !== 'object') {
      return body as any;
    }

    return body.value && body.errorList ? body.value : body;
  }
  private httpError$: Subject<HttpErrorResponse> = new Subject();
  private ignoreRequests: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private injector: Injector) {}

  doGet<T>(url: string, options?: HttpRequestOptions): Observable<T> {
    return from(this.getRequestOptions(options)).pipe(
      catchError((err) => this.handleError(err, options)),
      switchMap((requestOptions) =>
        this.http.get<T>(Config.API_URL + url, requestOptions).pipe(
          map((data) => this.extractData(data)),
          catchError((err) => this.handleError(err, options))
        )
      )
    );
  }

  doPost<T>(
    url: string,
    body?: any,
    options?: HttpRequestOptions
  ): Observable<T> {
    return from(this.getRequestOptions(options)).pipe(
      catchError((err) => this.handleError(err, options)),
      switchMap((requestOptions) =>
        this.http.post<T>(Config.API_URL + url, body, requestOptions).pipe(
          map((data) => this.extractData(data)),
          catchError((err) => this.handleError(err, options))
        )
      )
    );
  }

  doPut<T>(
    url: string,
    body: any,
    options?: HttpRequestOptions
  ): Observable<T> {
    return from(this.getRequestOptions(options)).pipe(
      catchError((err) => this.handleError(err, options)),
      switchMap((requestOptions) =>
        this.http.put<T>(Config.API_URL + url, body, requestOptions).pipe(
          map((data) => this.extractData(data)),
          catchError((err) => this.handleError(err, options))
        )
      )
    );
  }

  doPatch<T>(
    url: string,
    body: any,
    options?: HttpRequestOptions
  ): Observable<T> {
    return from(this.getRequestOptions(options)).pipe(
      catchError((err) => this.handleError(err, options)),
      switchMap((requestOptions) =>
        this.http.patch<T>(Config.API_URL + url, body, requestOptions).pipe(
          map((data) => this.extractData(data)),
          catchError((err) => this.handleError(err, options))
        )
      )
    );
  }

  doDelete<T>(url: string, options?: HttpRequestOptions): Observable<T> {
    return from(this.getRequestOptions(options)).pipe(
      catchError((err) => this.handleError(err, options)),
      switchMap((requestOptions) =>
        this.http.delete<T>(Config.API_URL + url, requestOptions).pipe(
          map((data) => this.extractData(data)),
          catchError((err) => this.handleError(err, options))
        )
      )
    );
  }

  request<T>(
    method: string,
    url: string,
    body: any,
    options: HttpRequestOptions
  ): Observable<HttpEvent<T>> {
    return from(this.getRequestOptions(options)).pipe(
      catchError((err) => this.handleError(err, options)),
      switchMap((requestOptions) =>
        this.http
          .request(
            new HttpRequest(method, Config.API_URL + url, body, requestOptions)
          )
          .pipe(
            switchMap((ev) => of(ev)),
            catchError((err) => this.handleError(err, options))
          )
      )
    );
  }

  getHttpErrorSubject(): Observable<HttpErrorResponse> {
    return this.httpError$.asObservable();
  }

  getIgnoreRequests(): Observable<boolean> {
    return this.ignoreRequests.asObservable();
  }

  getHeaders(): Observable<HttpHeaders> {
    const currentUserService = this.injector.get(CurrentUserService);
    return currentUserService.getCurrentUser().pipe(
      map((currentUser) => {
        let headers = new HttpHeaders().set('Accept', 'application/json');
        if (currentUser?.tokens) {
          headers = headers.set(
            'Authorization',
            'Bearer ' + currentUser.tokens.accessToken
          );
        }
        return headers;
      })
    );
  }

  private getRequestOptions(options: HttpRequestOptions = {}): Observable<any> {
    return this.getHeaders().pipe(
      map((headers) => {
        if (options.modifyHeaders) {
          headers = options.modifyHeaders(headers);
        }

        if (options.omitPause) {
          headers = headers.set('X-omit-pause', 'true');
        }

        if (options.stopOtherRequests) {
          headers = headers.set('X-Pause-Requests', 'true');
        }

        return {
          headers,
          // TOOD: remove when https://github.com/angular/angular/issues/18680#issuecomment-330425866 is fixed
          responseType: options.responseType || 'json',
          observe: options.observe || 'response',
          reportProgress: options.reportProgress || false,
          params: options.params || null,
        };
      })
    );
  }

  private extractData(res: any): any {
    return HttpService.normalizeResponse(res.body);
  }

  private handleError(
    err: HttpErrorResponse,
    requestOptions: HttpRequestOptions = {}
  ): Observable<any> {
    const next$ = (error: Error) => {
      if (error instanceof HttpErrorResponse) {
        this.httpError$.next(error);
      }
      throw error;
    };
    if (requestOptions.errorHandler === HttpErrorHandlerType.NO_EMIT) {
      throw err;
    }
    if (requestOptions.errorHandler instanceof Function) {
      return requestOptions.errorHandler(err, next$);
    }
    return next$(err);
  }
}
