import {Account, Company} from './companies';

export interface Bond {
  id: string;
  issuedAt: Date;
  issuer: Company;
  dateOfPayment: Date;
  amount: number;
}
