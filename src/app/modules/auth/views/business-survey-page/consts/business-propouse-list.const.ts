import { LoanPurpose } from 'src/app/shared/enums/loan-purpose.enum';

export const businessPurposeListConst = [
  { name: 'Working capital', value: LoanPurpose.WorkingCapital },
  { name: 'Equipment purchase', value: LoanPurpose.EquipmentPurchase },
  { name: 'Inventory purchase', value: LoanPurpose.InventoryPurchase },
  { name: 'Expand business (new location)', value: LoanPurpose.ExpandBusiness },
  { name: 'Finance debt obligation', value: LoanPurpose.FinanceDebtObligation },
  { name: 'Marketing or design', value: LoanPurpose.MarketingOrDesign },
  { name: 'Emergency (repairs etc.)', value: LoanPurpose.Emergency },
  { name: 'Other', value: LoanPurpose.Other },
];
