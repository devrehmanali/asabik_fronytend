import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { Link } from 'src/app/shared/links.const';
import { LogInDto } from '../models/log-in.dto';
import { Session } from '../models/session.interface';
import { TokenWithExpirationTime } from '../models/token-with-expiration-time.interface';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'Session';
  constructor(
    private httpService: HttpService,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  signIn(logInDto: LogInDto): Observable<Session> {
    return this.httpService.doPost<Session>(`${this.baseUrl}`, logInDto);
  }

  logout(): Observable<void> {
    return this.currentUserService.removeCurrentUser().pipe(
      tap(() => {
        this.router.navigate([Link.LogIn]);
      })
    );
  }

  refreshToken(): Observable<TokenWithExpirationTime> {
    return this.httpService.doPost<TokenWithExpirationTime>(
      `${this.baseUrl}/refresh-token`
    );
  }
}
