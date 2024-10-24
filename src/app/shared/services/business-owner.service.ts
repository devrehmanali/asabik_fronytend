import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { BusinessOwnerDetails } from '../models/business-owner-details.interface';
import { BusinessOwnerGetAdminResponse } from '../models/business-owner-get-admin-response.interface';
import { BusinessOwnerGetResponse } from '../models/business-owner-get-response.interface';
import { BusinessOwnerProfileUpdate } from '../models/business-owner-profile-update.interface';
import { MonthlyReport } from '../models/monthly-report.interface';
import { BusinessOwnerGetDetailedAdminResponse } from '../models/business-owner-get-detailed-admin-response.interface';
import { BlockBusinessOwnerRequest } from '../models/block-business-owner-request.interface';
import { DecideInvestmentRequest } from '../models/decide-investment-request.interface';
import { BusinessOwnerSurvey } from '../models/business-owner-survey.interface';
import { BusinessOwnerSurveyAnswers } from '../models/business.owner.survey.answers.interface';
import { MonthlyReportAdminResponse } from '../models/monthly-report-admin-response.interface';
import { DecideMonthlyReport } from '../models/decide-monthly-report.interface';
import { NewestMonthlyReportAdminResponse } from '../models/newest-monthly-report-admin-response.interface';
import { IdentityScoreAdminResponse } from '../models/identity-score-admin-response.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessOwnerService {
  private readonly baseUrl = 'business-owners';
  constructor(private httpService: HttpService) {}

  uploadReports(id: number, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpService.doPut<void>(
      `admin-data/${this.baseUrl}/${id}/csv-upload`,
      formData
    );
  }

  getAll(companyName?: string): Observable<BusinessOwnerGetResponse[]> {
    const queryParams = companyName ? `?companyName=${companyName}` : '';
    return this.httpService.doGet<BusinessOwnerGetResponse[]>(
      `${this.baseUrl}${queryParams}`
    );
  }

  getAllForAdmin(
    companyName?: string
  ): Observable<BusinessOwnerGetAdminResponse[]> {
    const queryParams = companyName ? `?companyName=${companyName}` : '';
    return this.httpService.doGet<BusinessOwnerGetAdminResponse[]>(
      `admin-data/${this.baseUrl}${queryParams}`
    );
  }

  getDetailsForAdmin(id: number): Observable<BusinessOwnerDetails> {
    return this.httpService.doGet<BusinessOwnerDetails>(
      `admin-data/${this.baseUrl}/${id}`
    );
  }

  getBusinessOwnerByIdForAdmin(
    id: number
  ): Observable<BusinessOwnerGetDetailedAdminResponse> {
    return this.httpService.doGet<BusinessOwnerGetDetailedAdminResponse>(
      `admin-data/${this.baseUrl}/${id}`
    );
  }

  getBusinessOwnerMonthlyReports(id: number): Observable<MonthlyReport[]> {
    return this.httpService.doGet<MonthlyReport[]>(
      `admin-data/${this.baseUrl}/${id}/monthly-reports`
    );
  }

  getBusinessOwnersMonthlyReport(
    businessOwnerId: number
  ): Observable<MonthlyReportAdminResponse> {
    return this.httpService.doGet<MonthlyReportAdminResponse>(
      `admin-data/${this.baseUrl}/${businessOwnerId}/monthly-report`
    );
  }

  getBusinessOwnersNewestMonthlyReport(
    businessOwnerId: number
  ): Observable<NewestMonthlyReportAdminResponse> {
    return this.httpService.doGet<NewestMonthlyReportAdminResponse>(
      `admin-data/${this.baseUrl}/${businessOwnerId}/newest-monthly-report`
    );
  }

  getSurveyAnswersPdf(
    businessOwnerId: number
  ): Observable<BusinessOwnerSurveyAnswers> {
    return this.httpService.doGet<BusinessOwnerSurveyAnswers>(
      `admin-data/${this.baseUrl}/${businessOwnerId}/survey-answers`
    );
  }

  getBusinessOwnersIdentityScore(
    id: number
  ): Observable<IdentityScoreAdminResponse> {
    return this.httpService.doGet<IdentityScoreAdminResponse>(
      `admin-data/${this.baseUrl}/${id}/identity-score`
    );
  }

  blockOrUnblockBusinessOwner(
    id: number,
    isBlocked: boolean
  ): Observable<void> {
    const blockBusinessOwner: BlockBusinessOwnerRequest = {
      isBlocked: isBlocked,
    };

    return this.httpService.doPatch<void>(
      `admin-data/${this.baseUrl}/${id}`,
      blockBusinessOwner
    );
  }

  decideMonthlyReportUpdate(
    id: number,
    decideMonthlyReport: DecideMonthlyReport
  ): Observable<void> {
    return this.httpService.doPatch<void>(
      `admin-data/${this.baseUrl}/${id}/monthly-report`,
      decideMonthlyReport
    );
  }

  decideInvestmentRequestForManualProcessing(
    id: number,
    decideInvestmentRequest: DecideInvestmentRequest
  ): Observable<void> {
    return this.httpService.doPatch<void>(
      `admin-data/${this.baseUrl}/${id}/manual-processing`,
      decideInvestmentRequest
    );
  }

  updateProfile(
    id: number,
    updateDto: BusinessOwnerProfileUpdate
  ): Observable<void> {
    return this.httpService.doPatch<void>(
      `admin-data/${this.baseUrl}/${id}/profile`,
      updateDto
    );
  }
}
