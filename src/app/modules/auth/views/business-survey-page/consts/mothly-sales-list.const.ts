import { MonthlySales } from 'src/app/shared/enums/monthly-sales.enum';

export const monthlySalesListConst = [
  { label: 'Up to USD $4,999', value: MonthlySales.UpTo5 },
  { label: 'USD $5,000 - USD $24,999', value: MonthlySales.From5To25 },
  { label: 'USD $25,000 - USD $49,999', value: MonthlySales.From25To50 },
  { label: 'USD $50,000 - USD $99,999', value: MonthlySales.From50To100 },
  { label: 'USD $100,000 - USD $199,000', value: MonthlySales.From100To200 },
  { label: 'USD $200,000 - USD $399,000', value: MonthlySales.From200To400 },
  { label: 'More than USD $400,000', value: MonthlySales.MoreThan400 },
];
