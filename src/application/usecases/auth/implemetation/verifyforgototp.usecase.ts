import { injectable } from "inversify";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { VerifyForgotOtpDTO } from "../../../dtos/auth/verify.forgototp.dto";

import { IVerifyForgotOtpUseCase } from "../interface/verifyforgot.otp.interface"; 

import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";

import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";


import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";

@injectable()
export class VerifyForgotPasswordOtpUseCase implements IVerifyForgotOtpUseCase {

    async execute(dto: VerifyForgotOtpDTO): Promise<{ message: string }> {

        const email = dto.email.toLowerCase().trim();

        const data = await redisClient.get(`forgot-otp:${email}`);

        if (!data) {
            throw new NotFoundError(ERROR_MESSAGE.OTP_EXPIRED);
        }

        const parsedData = JSON.parse(data);

        if (
            parsedData.otp.toString() !== dto.otp.toString()
        ) {
            throw new ValidationError(ERROR_MESSAGE.INVALID_OTP);
        }

        await redisClient.del(`forgot-otp:${email}` );

        return {
            message: "OTP verified successfully"
        };
    }
}