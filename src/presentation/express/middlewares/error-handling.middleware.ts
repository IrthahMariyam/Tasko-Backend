import { BaseError } from "../../../shared/utils/error-handling/base.error";
import { SERVER_ERROR_STATUS } from "../../../shared/constants/status-code/server-error.status";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../../shared/logger/logger";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("error occured", err);
  console.log("error occurred", err);
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      status: false,
      message: err.message,
      data: err.data || null,
    });
  }
  return res.status(SERVER_ERROR_STATUS.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: ERROR_MESSAGE.SERVER_ERROR,
  });
};
