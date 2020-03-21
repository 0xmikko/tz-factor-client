import {Account} from "./companies";
import {Bond} from "./bonds";

export interface Payment {
    id: string;
    date: Date;
    bond: Bond;
    from: Account;
    to: Account;
    amount: number;
    status: 'SUBMITTED' | 'CONFIRMED';

}

export interface PaymentCreateDTO {
    from: string;
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
