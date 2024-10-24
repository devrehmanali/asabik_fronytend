import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { InvestorDetails } from '../models/investor-details.interface';
import { InvestorGetResponse } from '../models/investor-get-response.interface';
import { InvestorProfilePatch } from '../models/investor-profile-patch.interface';
import { BlockInvestorRequest } from '../models/block-investor-request.interface';

@Injectable({
  providedIn: 'root',
})
export class InvestorService {
  private readonly baseUrl = 'investors';
  constructor(private httpService: HttpService) {}

  getAllFoAdminPanel(): Observable<InvestorGetResponse[]> {
    return this.httpService.doGet<InvestorGetResponse[]>(
      `admin-data/${this.baseUrl}`
    );
  }

  getDetailsFoAdminPanel(id: number): Observable<InvestorDetails> {
    return this.httpService.doGet<InvestorDetails>(
      `admin-data/${this.baseUrl}/${id}`
    );
  }

  blockOrUnblockInvestor(id: number, isBlocked: boolean): Observable<void> {
    const blockInvestor: BlockInvestorRequest = {
      isBlocked: isBlocked,
    };

    return this.httpService.doPatch<void>(
      `admin-data/${this.baseUrl}/${id}`,
      blockInvestor
    );
  }

  updateProfile(id: number, updateDto: InvestorProfilePatch): Observable<void> {
    return this.httpService.doPatch<void>(
      `admin-data/${this.baseUrl}/${id}/profile`,
      updateDto
    );
  }
}
