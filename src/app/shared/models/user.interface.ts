import { Role } from './role.enum';

export interface User {
  id: 8;
  email: string;
  activated: boolean;
  createdAt: Date;
  updatedAt: Date;
  role?: Role;
}
