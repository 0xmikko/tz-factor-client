/*
 * TZ-Factor - DeFi Factoring on Tezos
 * https://github.com/MikaelLazarev/tz-factor-client
 * Copyright (c) 2020. Mikhail Lazarev
 */

export interface Offer {
    id: string;
    status: 'New' | 'Partial' | 'Done' | 'Cancelled';
    bondId: number;
    account: string;
    amount: number;
    sold: number;
    price: number;
    interest?: number;
}

export interface OfferCreateDTO {
    bondId: number;
    account: string;
    amount: number;
    price: number;
}

export interface OfferBuyDTO {
    offerId: string;
    account: string;
    amount: number;
}
