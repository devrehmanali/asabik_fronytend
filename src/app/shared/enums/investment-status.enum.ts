export enum InvestmentStatus {
  PROCESSING_FROM_SURVEY = 'Request is beeing processed',
  REJECTED = 'Rejected - less than $2000 raised',
  CANCELLED = 'Application cancelled',
  CLOSED = 'Application closed',
  TRANSFERED = 'Funds has been transfered',
  OPEN = 'Application open',
  MANUAL_PROCESSING = 'Application awaits for manual processing',
  ADMIN_MANUAL_PROCESSING = 'Manual processing',
  OPEN_INVESTOR_RESPONSE = 'Open to invest',
  OPEN_BUSINESS_OWNER_RESPONSE = 'Raising funds',
  CLOSED_INVESTOR_RESPONSE = 'Closed',
  CLOSED_BUSINESS_OWNER_RESPONSE = 'Funds to be deposited',
}
