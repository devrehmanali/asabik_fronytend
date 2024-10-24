import { BusinessRating } from '../enums/business-rating.enum';

export interface InvestmentRequestGetDetailedResponse {
  id: number;
  psr: string;
  projectedNetReturn: string;
  nextInstallmentAmount: number;
  nextInstallmentDate: string;
  nextPlaidVerifDate: string;
  finalPaymentAmount: number;
  finalPaymentDate: string;
  dti: string;
  rating: BusinessRating;
  approvedAt: string;
}
