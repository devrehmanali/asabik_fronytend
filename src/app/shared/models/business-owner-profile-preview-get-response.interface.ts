import { BusinessSubsectorDetailsGetResponse } from './business-subsector-details-get-response.interface';
import { InvestmentRequestGetInvestorResponse } from './investment-request-get-investor-response.interface';
import { InvestmentsRequestSummaryGetResponse } from './investment-request-get-summary.interface';

export interface BusinessOwnerProfilePreviewGetResponse {
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
  investmentRequests: InvestmentRequestGetInvestorResponse[];
  isProfileComplete: boolean;
  isValidForRequest: boolean;
  investmentsRequestsSummary?: InvestmentsRequestSummaryGetResponse;
  startDate: string;
  avrMonthlySales: number;
  avrMonthlyNetProfit: number;
  totalLastYearNetProfit: number;
  employeesNo: number;
}
