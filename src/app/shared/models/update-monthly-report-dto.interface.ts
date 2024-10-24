export interface UpdateMonthlyReportDto {
  monthlyReportId: number;
  inflowDescription: string;
  inflow: number;
  outflow: number;
  outflowDescription: string;
}
