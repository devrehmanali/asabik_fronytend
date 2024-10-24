export interface InvestorSurvey {
  questions: InvestorSurveyQuestion[];
  fullName: string;
}

export interface InvestorSurveyQuestion {
  question: string;
  answer: boolean;
}
