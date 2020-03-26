import {Bond} from "./bonds";
import {Account, AccountKey} from "./accounts";

export interface Payment {
    id: string;
    date: Date;
    bond: Bond;
    from: Account;
    to: Account;
    amount: number;
    status: 'SUBMITTED' | 'CONFIRMED';

}

export interface TransferBondsDTO {
    bond: string;
    from?: AccountKey;
    to: string;
    amount: number;
}

export interface TransferMoneyDTO {
    from?: AccountKey;
    to: string;
    amount: number;
}

export interface PaymentListItem {
    id: string,
    date: Date,
    amount: number,
    fromCompany: string,
    toCompany: string,
    issuer: string,
    matureDate: Date,
    status: string,
}
