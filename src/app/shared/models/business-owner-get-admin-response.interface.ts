import { BusinessRating } from '../enums/business-rating.enum';

export interface BusinessOwnerGetAdminResponse {
  id: number;
  companyName: string;
  ownerName: string;
  sector: string;
  requiredInvestment: number;
  // estimatedReturn: number;
  // rating: BusinessRating;
  isActive: boolean;
}
