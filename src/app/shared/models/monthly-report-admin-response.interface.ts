import { MonthlyReportFromPlaidAdminResponse } from './monthly-report-from-plaid-admin-response.interface';
import { MonthlyReportUsersUpdateAdminResponse } from './monthly-report-users-update-admin-response.interface';

export interface MonthlyReportAdminResponse {
  monthlyReportId: number;
  monthlyReportFromPaid: MonthlyReportFromPlaidAdminResponse;
  monthlyReportUpdate: MonthlyReportUsersUpdateAdminResponse;
}
