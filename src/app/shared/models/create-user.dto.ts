import { Role } from './role.enum';

export interface CreateUserDto {
  email: string;
  password: string;
  role: Role;
}
