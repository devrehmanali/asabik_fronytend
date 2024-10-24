import { ExtractedIdentityResponse } from './extracted-identity-response.interface';
import { InvestmentGetAdminResponse } from './investment-get-admin-response.interface';

export interface InvestorDetails {
  id: number;
  companyName: string;
  fullName: string;
  registrationDate: Date;
  totalInvestments: number;
  email: string;
  website: string;
  isActive: boolean;
  isBlocked: boolean;
  investments: InvestmentGetAdminResponse[];
  extractedIdentity?: ExtractedIdentityResponse;
}
