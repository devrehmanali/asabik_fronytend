import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { CreateUserDto } from '../models/create-user.dto';
import { User } from '../models/user.interface';
import { ConfirmEmailResponse } from '../models/confirm-email-response.interface';
import { AdminCharts } from '../models/admin-charts.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'users';
  constructor(private httpService: HttpService) {}

  getUsersInfo(): Observable<{
    numberOfUsers: number;
    numberOfBusinessOwners: number;
    numberOfInvestors: number;
  }> {
    return this.httpService.doGet(`${this.baseUrl}/info`);
  }

  create(createUserDto: CreateUserDto): Observable<User> {
    return this.httpService.doPost<User>(`${this.baseUrl}`, createUserDto);
  }

  getMonthlyReportChartData(): Observable<AdminCharts> {
    return this.httpService.doGet<AdminCharts>(`${this.baseUrl}/charts`);
  }

  sendConfirmationEmail(email: string): Observable<void> {
    return this.httpService.doPost<void>(`${this.baseUrl}/confirmation-email`, {
      email,
    });
  }

  confirmEmail(
    userId: number,
    token: string
  ): Observable<ConfirmEmailResponse> {
    return this.httpService.doPost<ConfirmEmailResponse>(
      `${this.baseUrl}/${userId}/confirm-email`,
      {
        token,
      }
    );
  }

  sendResetPasswordEmail(email: string): Observable<void> {
    return this.httpService.doPost<void>(
      `${this.baseUrl}/reset-password-email`,
      {
        email,
      }
    );
  }

  resetPassword(
    userId: number,
    token: string,
    password: string
  ): Observable<void> {
    return this.httpService.doPost<void>(`${this.baseUrl}/${userId}/password`, {
      password,
      token,
    });
  }
}
