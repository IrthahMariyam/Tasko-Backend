var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "inversify";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
let VerifyForgotPasswordOtpUseCase = class VerifyForgotPasswordOtpUseCase {
    async execute({ email, otp }) {
        const normalizedEmail = email.toLowerCase().trim();
        const storedOtp = await redisClient.get(`forgot-otp:${normalizedEmail}`);
        if (!storedOtp)
            throw new NotFoundError(ERROR_MESSAGE.OTP_EXPIRED);
        if (storedOtp !== otp.trim())
            throw new ValidationError(ERROR_MESSAGE.INVALID_OTP);
        await redisClient.del(`forgot-otp:${normalizedEmail}`);
        await redisClient.set(`forgot-reset:${normalizedEmail}`, "verified", "EX", 10 * 60);
        return { message: "OTP verified successfully" };
    }
};
VerifyForgotPasswordOtpUseCase = __decorate([
    injectable()
], VerifyForgotPasswordOtpUseCase);
export { VerifyForgotPasswordOtpUseCase };
//# sourceMappingURL=verifyforgototp.usecase.js.map