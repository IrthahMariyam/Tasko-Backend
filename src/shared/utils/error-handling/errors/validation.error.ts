import { CLIENT_ERROR_STATUS } from "../../../constants/status-code/client-error.status";
import { BaseError } from "../base.error";
export class ValidationError extends BaseError {
  constructor(description: string = "Invalid Input", data?: unknown) {
    super(
      "ValidationError",
      CLIENT_ERROR_STATUS.BAD_REQUEST,
      description,
      data,
    );
  }
}
