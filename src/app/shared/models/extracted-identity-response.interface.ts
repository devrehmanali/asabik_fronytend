import { Address } from './address.interface';

export interface ExtractedIdentityResponse {
  extractedName?: string;
  extractedPhone?: string;
  extractedEmail?: string;
  extractedAddress?: Address;
}
