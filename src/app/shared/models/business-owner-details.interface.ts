import { BusinessRating } from '../enums/business-rating.enum';

export interface BusinessOwnerDetails {
  id: number;
  ownerName: string;
  isActive: boolean;
  registrationDate: Date;
  sector: string;
  companyName?: string;
  address?: Address;
  email: string;
  phoneNumber?: string;
  requiredInvestments: number;
  receivedInvestments: number;
  investors: any[];
  business: string;
  rating: BusinessRating;
}

export interface Address {
  city?: string;
  street?: string;
  zipCode?: string;
  state?: string;
}
