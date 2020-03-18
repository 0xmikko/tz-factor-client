

export interface Company {
    id: string;
    type: 'ISSUER' | 'SUPPLIER' | 'INVESTOR';
    name: string;
    address: string;
    taxId: string;
}


export interface Account {
    id: string
    company: Company

}
