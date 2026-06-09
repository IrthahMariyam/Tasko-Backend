import { SERVER_ERROR_STATUS } from "../../constants/status-code/server-error.status";
export class BaseError extends Error {
    name;
    statusCode;
    description;
    data;
    constructor(name = 'ServerError', statusCode = SERVER_ERROR_STATUS.INTERNAL_SERVER_ERROR, description = "Unexpected Error Occurred", data) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.description = description;
        this.data = data;
        Error.captureStackTrace(this);
    }
}
//# sourceMappingURL=base.error.js.map