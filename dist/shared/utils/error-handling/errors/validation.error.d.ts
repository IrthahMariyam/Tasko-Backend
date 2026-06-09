import { BaseError } from "../base.error";
export declare class ValidationError extends BaseError {
    constructor(description?: string, data?: unknown);
}
