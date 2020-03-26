

export interface Company {
    id: string;
    type: 'ISSUER' | 'SUPPLIER' | 'INVESTOR';
    name: string;
    address: string;
    web?: string;
    taxId: string;
}


