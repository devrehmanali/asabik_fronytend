export interface ResponseData<T = any> {
  errorList: {
    message: string;
    details: string;
    fatal: boolean;
  }[];
  httpStatus: string;
  value: T;
  status: number;
  isSuccessful: boolean;
  message?: string;
}
