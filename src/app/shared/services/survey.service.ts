import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { SurveyStatus } from 'src/app/modules/auth/views/survey-status-page/survey-status.enum';
import { BusinessOwnerSurvey } from '../models/business-owner-survey.interface';
import { InvestorSurvey } from '../models/investor-survey.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private readonly baseUrl = 'surveys';
  constructor(private httpService: HttpService) {}

  sendIvestorSurvey(
    survey: InvestorSurvey
  ): Observable<{ surveyStatus: SurveyStatus }> {
    return this.httpService.doPost<{ surveyStatus: SurveyStatus }>(
      `${this.baseUrl}/investor`,
      survey
    );
  }

  sendBussinesOwnerSurvey(
    survey: BusinessOwnerSurvey
  ): Observable<{ surveyStatus: SurveyStatus }> {
    return this.httpService.doPost<{ surveyStatus: SurveyStatus }>(
      `${this.baseUrl}/business-owner`,
      survey
    );
  }
}
