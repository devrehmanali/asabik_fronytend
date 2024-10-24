import { BusinessStructure } from '../enums/business-structure.enum';
import { MonthlySales } from '../enums/monthly-sales.enum';
import { CreateInvestmentRequestDto } from './investment-request-create.interface';

export interface BusinessOwnerSurvey {
  businessStartDate: string;
  investmentRequest: CreateInvestmentRequestDto;
  businessStructure: BusinessStructure;
  // monthlySales: MonthlySales;
  avrMonthlySales: number;
  avrMonthlyNetProfit: number;
  totalLastYearNetProfit: number;
  employeesNo: number;
  businessSubindustryId: number;
  website?: string;
}
