import { SERVER_ERROR_STATUS } from "../../constants/status-code/server-error.status";

export class BaseError extends Error {
  public readonly name: string;
  public readonly statusCode: number;
  public readonly description: string;
  public readonly data?: unknown;
  constructor(
    name: string = "ServerError",
    statusCode: number = SERVER_ERROR_STATUS.INTERNAL_SERVER_ERROR,
    description: string = "Unexpected Error Occurred",
    data?: unknown,
  ) {
    super(description);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    this.data = data;

    Error.captureStackTrace(this);
  }
}
