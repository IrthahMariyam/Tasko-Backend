import { CLIENT_ERROR_STATUS } from "../../../constants/status-code/client-error.status";
import { BaseError } from "../base.error";
export class NotFoundError extends BaseError {
  constructor(descritption = "Resource not found") {
    super("NotFoundError", CLIENT_ERROR_STATUS.NOT_FOUND, descritption);
  }
}
