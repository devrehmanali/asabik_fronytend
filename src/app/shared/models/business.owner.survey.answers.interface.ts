import { BusinessStructure } from '../enums/business-structure.enum';
import { SurveyValidations } from './survey-validations.interface';

export interface BusinessOwnerSurveyAnswers {
  id: number;
  startDate: string;
  business: string;
  businessSector: string;
  businessSubsector: string;
  businessStructure: BusinessStructure;
  avrMonthlySales: number;
  avrMonthlyNetProfit: number;
  totalLastYearNetProfit: number;
  employeesNo: number;
  website?: string;
  loanPurpose: string;
  businessOwnerDescription: string;
  surveyValidations: SurveyValidations;
}
