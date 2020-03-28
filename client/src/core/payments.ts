import {Bond} from "./bonds";
import {Account, AccountKey} from "./accounts";

export interface Payment {
    id: string;
    date: Date;
    sender?: Account;
    recipient?: Account;
    amount: number;
    isMoney: boolean;
    isIncoming?: boolean;
    bond? : Bond;
}

export interface TransferBondsDTO {
    bond: number;
    from?: AccountKey;
    to: string;
    amount: number;
}

export interface TransferMoneyDTO {
    from?: AccountKey;
    to: string;
    amount: number;
}
