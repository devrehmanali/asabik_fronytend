import { BusinessSubsectorDetailsGetResponse } from './business-subsector-details-get-response.interface';
import { InvestmentRequestGetInvestorResponse } from './investment-request-get-investor-response.interface';
import { BusinessRating } from '../enums/business-rating.enum';

export interface CompanyDetailsGetResponse {
  id: number;
  imgUrl?: string;
  companyName?: string;
  alreadyInvested: boolean;
  ownerName?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  website?: string;
  projectedNetReturn: number;
  term: number;
  invested: number;
  investors: number;
  rating: BusinessRating;
  businessSubsector: BusinessSubsectorDetailsGetResponse;
  description?: string;
  investmentRequests: InvestmentRequestGetInvestorResponse[];
  minRequiredInvestment?: number;
  startDate: string;
  avrMonthlySales: number;
  avrMonthlyNetProfit: number;
  totalLastYearNetProfit: number;
  employeesNo: number;
}
