import {Account, Company} from './companies';
import moment from 'moment';

export interface Bond {
  id: string;
  createdAt: Date;
  issuer: Company;
  matureDate: Date;
  amount: number;
}

export interface BondCreateDTO {
  amount: number;
  matureDate: number;
  account: string;
}

export function getBondTicker(b: Bond): string {
  return (
    b.issuer.name.toUpperCase() + moment(b.matureDate).format('-YYYY-MM-DD')
  );
}
