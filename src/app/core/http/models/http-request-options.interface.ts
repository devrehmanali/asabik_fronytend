import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorHandlerType } from './http-error-handler-type.interface';
import { ResponseErrorHandler } from './response-error-handler.interface';

export interface HttpRequestOptions {
  modifyHeaders?: (currentHeaders: HttpHeaders) => HttpHeaders;
  reportProgress?: boolean;
  params?: HttpParams;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
  errorHandler?: HttpErrorHandlerType | ResponseErrorHandler;
  observe?: 'body' | 'response';
  stopOtherRequests?: boolean;
  omitPause?: boolean;
}
