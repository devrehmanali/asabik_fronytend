import { LoanPurpose } from '../enums/loan-purpose.enum';
import { InvestmentStatus } from '../enums/investment-status.enum';
import { BusinessRating } from '../enums/business-rating.enum';

export interface InvestmentRequestGetInvestorResponse {
  id: number;
  purposeOfTheLoan?: LoanPurpose;
  loanPurpose: string;
  helpIncreaseProfit: string;
  profitIncrease: number;
  rating: BusinessRating;
  dti: string;
  status: InvestmentStatus;
  expirationDate: string;
  returnTerm: number;
  requiredCapital: number;
  amountToMeetTarget: number;
  netReturnToShare: number;
  numberOfInvestors: number;
  projectedNetReturn: string;
  psr: string;
}
