import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class InvestService {
  constructor(private httpService: HttpService) {}

  invest(investmentRequestId: number, amount: number): Observable<{}> {
    return this.httpService.doPost<{}>(`investments`, {
      investmentRequestId: investmentRequestId,
      amount: amount,
    });
  }
}
