import { TokenWithExpirationTime } from './token-with-expiration-time.interface';

export interface Session {
  tokens?: TokenWithExpirationTime;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
}
