import { AlertType } from '../components/alert/alert.enum';

export interface Alert {
  type: AlertType;
  message: string;
}
