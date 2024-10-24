import { BusinessRating } from '../enums/business-rating.enum';

export interface RangesRowResponse {
  rating: BusinessRating;
  low: number;
  high: number;
}
