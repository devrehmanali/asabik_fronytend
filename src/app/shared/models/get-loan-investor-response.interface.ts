import { InstallmentBusinessOwnerResponse } from './installment-business-owner-response.interface';

export interface GetLoanInvestorResponse {
  declaredProfitToShare: number;
  raisedFunds: number;
  invested: number;
  investedPercentage: string;
  installments: InstallmentBusinessOwnerResponse[];
}
