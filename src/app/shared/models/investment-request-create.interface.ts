import { LoanPurpose } from '../enums/loan-purpose.enum';
export interface CreateInvestmentRequestDto {
  purposeOfTheLoan: LoanPurpose;
  requiredCapital: number;
  returnTerm: number;
  netReturn: number;
  netReturnToShare: number;
  loanPurpose: string;
  helpIncreaseProfit: string;
  profitIncrease: number;
}
