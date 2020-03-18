import {Account, Company} from './companies';

export interface Bond {
  id: string;
  issuedAt: Date;
  issuer: Company;
  matureDate: Date;
  amount: number;
}
