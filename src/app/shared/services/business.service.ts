import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { BusinessGetResponse } from '../models/business-get-response.interface';
import { BusinessSurveyView } from '../models/business-survey-view.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private readonly baseUrl = 'businesses';
  constructor(private httpService: HttpService) {}

  getAll(): Observable<BusinessGetResponse[]> {
    return this.httpService.doGet<BusinessGetResponse[]>(`${this.baseUrl}`);
  }

  toBusinessesSurveyView(
    businesses: BusinessGetResponse[]
  ): Observable<BusinessSurveyView[]> {
    return of(
      businesses.map((business) => {
        let idAsString = business.id.toString();
        let formattedId = idAsString;
        if (business.id > 99) {
          formattedId =
            idAsString.substring(0, 2) + '-' + idAsString.substring(2);
        }
        return {
          id: formattedId,
          name: business.name,
        };
      })
    );
  }

  getBusinessSectors(businessId: number): Observable<BusinessGetResponse[]> {
    return this.httpService.doGet<BusinessGetResponse[]>(
      `${this.baseUrl}/${businessId}/sectors`
    );
  }

  getBusinessSubsectors(
    businessId: number,
    sectorId: number
  ): Observable<BusinessGetResponse[]> {
    return this.httpService.doGet<BusinessGetResponse[]>(
      `${this.baseUrl}/${businessId}/sectors/${sectorId}/subsectors`
    );
  }
}
