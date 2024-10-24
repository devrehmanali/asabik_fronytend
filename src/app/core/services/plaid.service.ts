import { Injectable } from '@angular/core';
import { LinkTokenGetResponse } from 'plaid';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { CreateAccessTokenDto } from 'src/app/shared/models/create-access-token-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class PlaidService {
  private readonly baseUrl = 'plaid';
  constructor(private httpService: HttpService) {}

  getLinkToken(): Observable<LinkTokenGetResponse> {
    return this.httpService.doGet(`${this.baseUrl}/link-token`);
  }

  createAccessToken(publicToken: string): Observable<LinkTokenGetResponse> {
    return this.httpService.doPost(`${this.baseUrl}/access-token`, {
      publicToken,
    });
  }

  getAdminLinkToken(): Observable<LinkTokenGetResponse> {
    return this.httpService.doGet(`admin-data/${this.baseUrl}/link-token`);
  }

  setAdminsAccessToken(publicToken: string): Observable<CreateAccessTokenDto> {
    return this.httpService.doPost(`admin-data/${this.baseUrl}/access-token`, {
      publicToken,
    });
  }
  getIdentityVerificationLinkToken(): Observable<String> {
    return this.httpService.doGet(`${this.baseUrl}/identity-verif-link`, {
      responseType: 'text',
    });
  }
}
