import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { CompanyDetailsGetResponse } from '../models/company-details.interace';

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailsService {
  private readonly baseUrl = 'business-owners';
  constructor(private httpService: HttpService) {}

  getCompany(companyId?: number): Observable<CompanyDetailsGetResponse> {
    return this.httpService.doGet<CompanyDetailsGetResponse>(
      `${this.baseUrl}/${companyId}`
    );
  }
}
