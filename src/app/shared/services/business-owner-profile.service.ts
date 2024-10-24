import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { BusinessOwnerProfileGetResponse } from '../models/business-owner-profile-get-response.interface';
import { BusinessOwnerProfilePreviewGetResponse } from '../models/business-owner-profile-preview-get-response.interface';
import { BusinessOwnerProfileUpdate } from '../models/business-owner-profile-update.interface';
import { MonthlyReportRatingResponse } from '../models/monthly-report-rating-response.interface';
import { UpdateMonthlyReportDto } from '../models/update-monthly-report-dto.interface';
import { Payload } from '../models/payload.interface';
import { ConfirmMonthlyReportDto } from '../models/confirm-monthly-report-dto.interface';
import { BusinessOwnerAlertsResponse } from '../models/business-owner-alerts-response.interface';
import { ChartPoint } from '../models/chart-point.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessOwnerProfileService {
  private readonly baseUrl = 'business-owners/my/profile';
  constructor(private httpService: HttpService) {}

  getMyProfile(): Observable<BusinessOwnerProfileGetResponse> {
    return this.httpService.doGet<BusinessOwnerProfileGetResponse>(
      `${this.baseUrl}`
    );
  }

  updateMyProfileImg(newImg: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', newImg);

    return this.httpService.doPut<void>(`${this.baseUrl}/image`, formData, {
      modifyHeaders: (heders) =>
        heders.delete('Content-Length').delete('Content-Type'),
    });
  }

  removeMyProfileImg(): Observable<void> {
    return this.httpService.doDelete<void>(`${this.baseUrl}/image`);
  }

  updateMyProfile(
    businessOwnerProfileUpdate: BusinessOwnerProfileUpdate
  ): Observable<BusinessOwnerProfileGetResponse> {
    return this.httpService.doPatch<BusinessOwnerProfileGetResponse>(
      `${this.baseUrl}`,
      businessOwnerProfileUpdate
    );
  }

  getMyPreviewProfile(): Observable<BusinessOwnerProfilePreviewGetResponse> {
    return this.httpService.doGet<BusinessOwnerProfilePreviewGetResponse>(
      `${this.baseUrl}/preview`
    );
  }

  getBusinessOwnersMonthlyReport(): Observable<MonthlyReportRatingResponse> {
    return this.httpService.doGet<MonthlyReportRatingResponse>(
      `${this.baseUrl}/monthly-report`
    );
  }

  updateBusinessOwnersMonthlyReport(
    updateMonthlyReportDto: UpdateMonthlyReportDto
  ): Observable<void> {
    return this.httpService.doPost<void>(
      `${this.baseUrl}/monthly-report`,
      updateMonthlyReportDto
    );
  }

  confirmMonthlyReport(
    confirmMonthlyReportDto: ConfirmMonthlyReportDto
  ): Observable<void> {
    return this.httpService.doPatch<void>(
      `${this.baseUrl}/monthly-report`,
      confirmMonthlyReportDto
    );
  }

  getMonthlyReportChartData(): Observable<ChartPoint[]> {
    return this.httpService.doGet<ChartPoint[]>(
      `${this.baseUrl}/monthly-report-chart`
    );
  }

  getBusinessOwnerAlerts(): Observable<BusinessOwnerAlertsResponse> {
    return this.httpService.doGet<BusinessOwnerAlertsResponse>(
      `${this.baseUrl}/alerts`
    );
  }

  deleteBusinessOwner(): Observable<void> {
    return this.httpService.doDelete<void>(`${this.baseUrl}`);
  }
}
