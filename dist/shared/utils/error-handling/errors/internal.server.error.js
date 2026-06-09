import { SERVER_ERROR_STATUS } from "../../../constants/status-code/server-error.status";
import { BaseError } from "../base.error";
export class InternalLServerError extends BaseError {
    constructor(description = 'Internal Server Error') {
        super('InternalServerError', SERVER_ERROR_STATUS.INTERNAL_SERVER_ERROR, description);
    }
}
//# sourceMappingURL=internal.server.error.js.map