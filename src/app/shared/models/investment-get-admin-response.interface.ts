export interface InvestmentGetAdminResponse {
  businessOwnerId: number;
  companyName: string;
  businessOwnersName: string;
  businessSector: string;
  isActive: boolean;
  requiredInvestment: number;
  alreadyInvested: number;
  investmentRequestId: number;
  isLoan: boolean;
}
