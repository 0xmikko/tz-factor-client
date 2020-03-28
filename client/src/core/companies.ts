

export interface Company {
    id: string;
    type: 'ISSUER' | 'SUPPLIER' | 'INVESTOR';
    name: string;
    orgType?: string;
    industry?: string;
    founder?: string;
    headquaters?: string;
    numberOfEmployees?: number;
    product?: string;
    revenue?: string;
    website?: string;
}

export interface UpsertCompanyProfileDTO{
    name: string;
    orgType: string;
    industry: string;
    founder: string;
    headquaters: string;
    numberOfEmployees: number;
    product: string;
    revenue: string;
    website: string;
}

