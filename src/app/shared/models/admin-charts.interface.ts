import { ChartPoint } from './chart-point.interface';
import { RequestsByPurpose } from './requests-by-purpose.interface';

export interface AdminCharts {
  businessOwnersMonthlyReports: ChartPoint[];
  requestsByPurpose: RequestsByPurpose[];
}
