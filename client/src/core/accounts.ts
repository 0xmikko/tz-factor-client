import {Company} from "./companies";

export interface FaucetAccount {
    name: string,
    mnemonic: string,
    secret: string,
    // pkh: string,
    password: string,
    email: string,
}

export interface AccountKey {
    id: string,
    name: string,
    publicKey: string,
    privateKey: string,
    secret: string,
    amount?: number,
    status: 'New' | 'Registered' | 'Revealed',
}

export interface Account {
    id: string
    company: Company
    amount: number
}
