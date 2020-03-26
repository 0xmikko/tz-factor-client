import {Company} from './companies';
import moment from 'moment';
import {Account, AccountKey} from "./accounts";

export interface Bond {
  id: string;
  createdAt: Date;
  issuer: Company;
  matureDate: Date;
  total: number;
  balance: Record<string, number>
}

export interface BondCreateDTO {
  account: AccountKey;
  amount: number;
  matureDate: number;
}


export function getBondTicker(b: Bond): string {
  return (
    b.issuer.name.toUpperCase() + moment(b.matureDate).format('-YYYY-MM-DD')
  );
}

export function getBalance(b: Bond, account: string) : number | undefined {
  return b.balance[account]

}
