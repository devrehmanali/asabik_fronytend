import { SurveyStatus } from 'src/app/modules/auth/views/survey-status-page/survey-status.enum';
import { TokenWithExpirationTime } from './token-with-expiration-time.interface';

export interface Session {
  tokens: TokenWithExpirationTime;
  name: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
  surveyStatus: SurveyStatus | null;
  plaidLink: boolean;
  isAppleUser: boolean;
}
