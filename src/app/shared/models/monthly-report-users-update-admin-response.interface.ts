export interface MonthlyReportUsersUpdateAdminResponse {
  reportDate: string;
  inflow: number;
  inflowDescription: string;
  outflow: number;
  outflowDescription: string;
  vInflow: number;
  vTotal: number;
  outflowExceed: boolean;
  isNegativeBalance: boolean;
  noEarning: boolean;
}
