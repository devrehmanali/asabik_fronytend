import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// tslint:disable-next-line
export type ResponseErrorHandler = (
  err: HttpErrorResponse,
  next: (err: Error) => Observable<Error>
) => Observable<any>;
