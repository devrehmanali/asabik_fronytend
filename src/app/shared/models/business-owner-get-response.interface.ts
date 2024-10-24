import { BusinessRating } from '../enums/business-rating.enum';
import { BusinessStructure } from '../enums/business-structure.enum';
import { BusinessSubsectorDetailsGetResponse } from './business-subsector-details-get-response.interface';

export interface BusinessOwnerGetResponse {
  id: number;
  isInvested: boolean;
  investedAmount: number;
  companyName: string;
  rating: BusinessRating;
  projectedNetReturn: string;
  expirationDate: string;
  returnTerm: number;
  amountToMeetTarget: number;
  isRepaying: boolean; //true ma wyświetlac installments
  businessSubsector: BusinessSubsectorDetailsGetResponse;
  psr: string;
  businessStructure: BusinessStructure;
}
