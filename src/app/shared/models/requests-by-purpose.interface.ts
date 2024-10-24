import { LoanPurpose } from '../enums/loan-purpose.enum';

export interface RequestsByPurpose {
  purpose: LoanPurpose;
  count: number;
}
