import { BusinessGetResponse } from './business-get-response.interface';

export interface BusinessSectorDetailsGetResponse {
  id: number;
  name: string;
  business: BusinessGetResponse;
}
