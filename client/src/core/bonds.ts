import {Company} from './companies';
import {AccountKey} from './accounts';
import {toHumanDate} from "../utils/formaters";
import {Offer} from "./offers";

export interface Bond {
  id: string;
  createdAt: Date;
  issuer: Company;
  matureDate: string;
  total: number;
  balance: Record<string, number>;
  avgInterest?: number;
  offers: Offer[];
}

export interface BondCreateDTO {
  account: AccountKey;
  amount: number;
  matureDate: number;
}

export function getBondTicker(b: Bond): string {
  return (
    b.issuer.name.toUpperCase() + toHumanDate(b.matureDate)
  );
}

export function getBalance(b: Bond, account: string): number | undefined {
  return b.balance[account];
}

export interface WalletBondInfo extends Bond {
  account: string;
  valueOnAccount?: number;
}
