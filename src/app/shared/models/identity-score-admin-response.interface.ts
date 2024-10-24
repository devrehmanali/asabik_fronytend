import { Address } from './address.interface';

export interface IdentityScoreAdminResponse {
  extractedName: string;
  ownerNameScore: number;
  extractedPhone: string;
  phoneScore: number;
  extractedEmail: string;
  emailScore: number;
  extractedAddress: Address;
  addressScore: number;
}
