import { sendOTP } from "../../../shared/utils/send.otp.util.js";
import { generateOTP } from "../../../shared/utils/otp.generate.util.js";
import { redisClient } from "../../../infrastructure/providers/redis/redis.provider.js";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message.js";
import { SUCCESS_MESSAGE } from "../../../shared/constants/messages/success.message.js";
export class ResendSignupOtpUseCase {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(email) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
        }
        if (user.isVerified) {
            throw new Error(ERROR_MESSAGE.USER_ALREADY_VERIFIED);
        }
        const otp = generateOTP();
        await redisClient.setex(`otp:signup:${email}`, 600, otp);
        await sendOTP(email, otp);
        return { message: SUCCESS_MESSAGE.OTP_RESEND };
    }
}
//# sourceMappingURL=resend-signup-otp.usecase.js.map