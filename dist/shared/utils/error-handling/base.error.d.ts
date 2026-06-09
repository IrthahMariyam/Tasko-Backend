export declare class BaseError extends Error {
    readonly name: string;
    readonly statusCode: number;
    readonly description: string;
    readonly data?: unknown;
    constructor(name?: string, statusCode?: number, description?: string, data?: unknown);
}
