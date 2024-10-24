import { Address } from './business-owner-details.interface';
import { InvestmentRequestGetAdminResponse } from './investment-request-get-admin-response.interface';

export interface BusinessOwnerGetDetailedAdminResponse {
  id: number;
  companyName: string;
  registrationDate: Date;
  ownerName: string;
  sector: string;
  address: Address;
  receivedInvestments: number;
  requiredInvestments: number;
  phoneNumber: string;
  email: string;
  isActive: boolean;
  isBlocked: boolean;
  isReportAvailable: boolean;
  investors: any[];
  investmentRequests: InvestmentRequestGetAdminResponse[];
}
