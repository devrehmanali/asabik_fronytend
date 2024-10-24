import { InstallmentBusinessOwnerResponse } from './installment-business-owner-response.interface';

export interface GetLoanBusinessOwnerResponse {
  declaredMotnhlyProfit: number;
  declaredProfitToShare: number;
  psr: string;
  installments: InstallmentBusinessOwnerResponse[];
}
