import { LoanPurpose } from '../enums/loan-purpose.enum';
import { InvestmentStatus } from '../enums/investment-status.enum';

export interface InvestmentRequestGetBusinessOwnerResponse {
  id: number;
  purposeOfTheLoan?: LoanPurpose;
  loanPurpose: string;
  helpIncreaseProfit: string;
  profitIncrease: number;
  returnTerm: number;
  requiredCapital: number;
  netReturn: number;
  netReturnToShare: number;
  status: InvestmentStatus;
  percentageRaised: number;
  timeLeft: string;
  isEligible: boolean;
  canEdit: boolean;
}
