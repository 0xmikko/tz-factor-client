export interface Operation {
    id: string,
    status: string,
    error?: string,
}

export const namespace = 'operations';
export const OPERATION_PREFIX = 'OPERATIONS@@';
