import { CLIENT_ERROR_STATUS } from "../../../constants/status-code/client-error.status";
import { BaseError } from "../base.error";

export class UnauthorizedError extends BaseError {
    constructor(description: string = 'Unauthorized') {
        super('UnauthorizedError', CLIENT_ERROR_STATUS.UNAUTHORIZED, description);
    }
}
