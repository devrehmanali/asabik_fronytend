import { BusinessStructure } from 'src/app/shared/enums/business-structure.enum';

export const businessStructureListConst = [
  { name: 'Corporation', value: BusinessStructure.Corporation },
  { name: 'LLC', value: BusinessStructure.LLC },
  { name: 'Sole proprietorship', value: BusinessStructure.SoleProprietorship },
  { name: 'Partnership', value: BusinessStructure.Partnership },
  { name: 'Single-member LLC', value: BusinessStructure.SingleMmemberLLC },
  {
    name: 'Nonprofit organization',
    value: BusinessStructure.NonprofitOrganization,
  },
];
