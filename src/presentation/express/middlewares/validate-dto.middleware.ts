import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CLIENT_ERROR_STATUS } from "../../../shared/constants/status-code/client-error.status";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message";

type DtoClass<T extends object> = new () => T;

export const validateDto =
  <T extends object>(dtoClass: DtoClass<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body, {
      excludeExtraneousValues: true,
    });

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const messages = errors.flatMap((error) =>
        Object.values(error.constraints ?? {})
      );

      return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({
        message: ERROR_MESSAGE.VALIDATION_FAILED,
        errors: messages,
      });
    }

    req.body = dto;
    next();
  };
