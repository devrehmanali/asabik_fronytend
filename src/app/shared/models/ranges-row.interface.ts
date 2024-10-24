import { BusinessRating } from '../enums/business-rating.enum';

export interface RangesRow {
  rating: BusinessRating;
  low: number;
  high: number;
}
