import { InstallmentData } from './installment-data.interface';

export interface InstallmentBusinessOwnerResponse {
  no: string;
  paymentDate: string;
  totalRevenue: number;
  totalNetProfit: number;
  profitToShare: number;
  transfer: number;
  installmentData: InstallmentData;
}
