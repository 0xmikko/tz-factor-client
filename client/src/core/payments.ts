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
