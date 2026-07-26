import { injectable } from "inversify";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { IVerifyForgotOtpUseCase } from "../interface/verifyforgot.otp.interface";

@injectable()
export class VerifyForgotPasswordOtpUseCase implements IVerifyForgotOtpUseCase {
  async execute({ email, otp }: { email: string; otp: string }): Promise<{ message: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    const storedOtp = await redisClient.get(`forgot-otp:${normalizedEmail}`);
    if (!storedOtp) throw new NotFoundError(ERROR_MESSAGE.OTP_EXPIRED);
    if (storedOtp !== otp.trim()) throw new ValidationError(ERROR_MESSAGE.INVALID_OTP);

    await redisClient.del(`forgot-otp:${normalizedEmail}`);
    await redisClient.set(`forgot-reset:${normalizedEmail}`, "verified", "EX", 10 * 60);
    return { message: SUCCESS_MESSAGE.OTP_VERIFIED };
  }
}
