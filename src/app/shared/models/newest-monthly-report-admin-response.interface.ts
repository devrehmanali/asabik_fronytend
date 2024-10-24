export interface NewestMonthlyReportAdminResponse {
  actionRequired: boolean;
  reportDate: string;
  isConfirmed: boolean;
  isOriginal: boolean;
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
