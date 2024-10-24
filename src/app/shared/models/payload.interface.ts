import { Role } from 'src/app/shared/models/role.enum';

export interface Payload {
  userId: number;
  email: string;
  role: Role;
  emailConfirmed: boolean;
  investorId: number;
  businessOwnerId: number;
  updatedAt: string;
  createdAt: string;
}
