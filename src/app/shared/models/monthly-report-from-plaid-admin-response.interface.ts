export interface MonthlyReportFromPlaidAdminResponse {
  reportDate: string;
  inflow: number;
  outflow: number;
  vInflow: number;
  vTotal: number;
  outflowExceed: boolean;
  isNegativeBalance: boolean;
  noEarning: boolean;
}
