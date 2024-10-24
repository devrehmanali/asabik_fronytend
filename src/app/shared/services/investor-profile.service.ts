import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { InvestorProfileGetResponse } from '../models/investor-profile-get-response.interface';
import { InvestorProfilePatch } from '../models/investor-profile-patch.interface';

@Injectable({
  providedIn: 'root',
})
export class InvestorProfileService {
  private readonly baseUrl = 'investors/my/profile';
  constructor(private httpService: HttpService) {}

  getMyProfile(): Observable<InvestorProfileGetResponse> {
    return this.httpService.doGet<InvestorProfileGetResponse>(
      `${this.baseUrl}`
    );
  }
  updateMyProfile(
    investorProfilePatch: InvestorProfilePatch
  ): Observable<void> {
    return this.httpService.doPatch<void>(
      `${this.baseUrl}`,
      investorProfilePatch
    );
  }
  deleteInvestor(): Observable<void> {
    return this.httpService.doDelete<void>(`${this.baseUrl}`);
  }
}
