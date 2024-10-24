import { BusinessRating } from '../enums/business-rating.enum';

export interface RangesRowUpdateDto {
  rating: BusinessRating;
  low: number;
  high: number;
}
