import { LoanPurpose } from '../enums/loan-purpose.enum';
import { InvestmentStatus } from '../enums/investment-status.enum';
import { BusinessRating } from '../enums/business-rating.enum';

export interface InvestmentRequestGetAdminResponse {
  id: number;
  purposeOfTheLoan?: LoanPurpose;
  approvedAt: string;
  returnTerm: number;
  loanPurpose: string;
  helpIncreaseProfit: string;
  requiredCapital: number;
  dti: string;
  rating: BusinessRating;
  ratingUpdate: BusinessRating;
  status: InvestmentStatus;
}
