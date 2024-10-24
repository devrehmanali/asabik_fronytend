import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { BusinessGetResponse } from '../models/business-get-response.interface';
import { CreateInvestmentRequestDto } from '../models/investment-request-create.interface';
import { InvestmentRequestPatch } from '../models/investment-request-patch.interface';
import { InvestmentRequestGetDetailedResponse } from '../models/investment-request-get-detailed-response.interface';
import { InvestmentRequestGetBusinessOwnerResponse } from '../models/investment-request-get-business-owner-response.interface';
import { CreditRatingDataResponse } from '../models/credit-rating-data-response.interface';
import { GetLoanBusinessOwnerResponse } from '../models/get-loan-business-owner-response.interface';
import { GetLoanInvestorResponse } from '../models/get-loan-investor-response.interface';
import { AdminGetInvestorLoanRequest } from '../models/admin-get-investor-loan-request.interface';
import { AdminGetBusinessOwnerLoanRequest } from '../models/admin-get-business-owner-loan-request.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvestmentRequestService {
  private readonly baseUrl = 'investment-requests';
  constructor(private httpService: HttpService, private http: HttpClient) {}

  getAllinvestmentRequests(): Observable<
    InvestmentRequestGetBusinessOwnerResponse[]
  > {
    return this.httpService.doGet<InvestmentRequestGetBusinessOwnerResponse[]>(
      `${this.baseUrl}`
    );
  }

  getDetailedResponse(
    id: number
  ): Observable<InvestmentRequestGetDetailedResponse> {
    return this.httpService.doGet<InvestmentRequestGetDetailedResponse>(
      `${this.baseUrl}/${id}`
    );
  }

  getLastLoan(id: number): Observable<GetLoanBusinessOwnerResponse> {
    return this.httpService.doGet<GetLoanBusinessOwnerResponse>(
      `${this.baseUrl}/${id}/loan`
    );
  }

  getLastLoanForInvestor(id: number): Observable<GetLoanInvestorResponse> {
    return this.httpService.doGet<GetLoanInvestorResponse>(
      `${this.baseUrl}/${id}/installments`
    );
  }

  getInvestorInstallmentsForAdmin(
    investorId: number,
    investmentRequestId: number
  ): Observable<GetLoanInvestorResponse> {
    const params = new HttpParams()
      .set('investorId', investorId.toString())
      .set('investmentRequestId', investmentRequestId.toString());

    return this.httpService.doGet<GetLoanInvestorResponse>(
      `${this.baseUrl}/${investmentRequestId}/admin/investor-loan/${investorId}`,
      { params }
    );
  }

  getBusinessOwnersInstallmentsForAdmin(
    businessOwnerId: number,
    investmentRequestId: number
  ): Observable<GetLoanBusinessOwnerResponse> {
    const params = new HttpParams()
      .set('businessOwnerId', businessOwnerId.toString())
      .set('investmentRequestId', investmentRequestId.toString());

    return this.httpService.doGet<GetLoanBusinessOwnerResponse>(
      `${this.baseUrl}/${investmentRequestId}/admin/business-owner-loan/${businessOwnerId}`,
      { params }
    );
  }

  getCreditRatingDataResponse(
    investmentRequestId: number
  ): Observable<CreditRatingDataResponse> {
    return this.httpService.doGet<CreditRatingDataResponse>(
      `${this.baseUrl}/${investmentRequestId}/rating-data`
    );
  }

  acceptLoan(investmentRequestId: number): Observable<string> {
    return this.httpService.doPatch<string>(
      `${this.baseUrl}/${investmentRequestId}/accept`,
      {}
    );
  }

  declineLoan(investmentRequestId: number): Observable<string> {
    return this.httpService.doPatch<string>(
      `${this.baseUrl}/${investmentRequestId}/decline`,
      {}
    );
  }

  extendRaisingTime(investmentRequestId: number): Observable<void> {
    return this.httpService.doPatch<void>(
      `${this.baseUrl}/${investmentRequestId}/extend`,
      {}
    );
  }

  create(data: CreateInvestmentRequestDto): Observable<string> {
    return this.httpService.doPost<string>(`${this.baseUrl}`, data);
  }

  update(id: number, data: InvestmentRequestPatch): Observable<void> {
    return this.httpService.doPatch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<BusinessGetResponse[]> {
    return this.httpService.doDelete<BusinessGetResponse[]>(
      `${this.baseUrl}/${id}`
    );
  }
}
