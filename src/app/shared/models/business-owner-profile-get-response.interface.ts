import { BusinessSubsectorDetailsGetResponse } from './business-subsector-details-get-response.interface';
import { InvestmentRequestGetBusinessOwnerResponse } from './investment-request-get-business-owner-response.interface';
// import { InvestmentsRequestSummaryGetResponse } from './investment-request-get-summary.interface';

export interface BusinessOwnerProfileGetResponse {
  imgUrl?: string;
  companyName?: string;
  ownerName?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  website?: string;
  businessSubsector: BusinessSubsectorDetailsGetResponse;
  businessDescription?: string;
  investmentRequests: InvestmentRequestGetBusinessOwnerResponse[];
  isProfileComplete: boolean;
  isValidForRequest: boolean;
  // investmentsRequestsSummary?: InvestmentsRequestSummaryGetResponse;
}
