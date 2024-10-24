import { BusinessRating } from '../enums/business-rating.enum';
import { MonthlyReportRatingResponse } from './monthly-report-rating-response.interface';
import { RangesResponse } from './ranges-response.interface';

export interface CreditRatingDataResponse {
  psr: string;
  rating: BusinessRating;
  r: number;
  m: number;
  a: number;
  returnTerm: number;
  requestedAmount: number;
  netReturn: number;
  netReturnToShare: number;
  totalNoMonth: number;
  outflowExceed: number;
  negativeBalance: number;
  noEarning: number;
  vInflow: number;
  vTotal: number;
  averageE: number;
  averageL: number;
  o: number;
  i: number;
  d1: number;
  d2: number;
  d0: number;
  pod: number;
  maxLoanCalc: number;
  low: number;
  high: number;
}
