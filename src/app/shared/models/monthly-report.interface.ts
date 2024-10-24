export interface MonthlyReport {
  id: number;
  createdAt: Date;
  reportDate: Date;
  inflow: number;
  outflow: number;
  vInflow?: number;
  vTotal?: number;
  outflowExceed: boolean;
  isNegativeBalance: boolean;
  isConfirmed: boolean;
}
