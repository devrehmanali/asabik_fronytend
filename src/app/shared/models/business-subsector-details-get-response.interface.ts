import { BusinessSectorDetailsGetResponse } from './business-sector-details-get-response.interface';

export interface BusinessSubsectorDetailsGetResponse {
  id: number;
  name: string;
  businessSector: BusinessSectorDetailsGetResponse;
}
