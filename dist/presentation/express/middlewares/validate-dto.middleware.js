import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CLIENT_ERROR_STATUS } from "../../../shared/constants/status-code/client-error.status";
export const validateDto = (dtoClass) => async (req, res, next) => {
    const dto = plainToInstance(dtoClass, req.body, {
        excludeExtraneousValues: true,
    });
    const errors = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
        const messages = errors.flatMap((error) => Object.values(error.constraints ?? {}));
        return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({
            message: "Validation failed",
            errors: messages,
        });
    }
    req.body = dto;
    next();
};
//# sourceMappingURL=validate-dto.middleware.js.map