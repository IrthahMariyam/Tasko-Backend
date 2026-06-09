import { redisClient } from "../../../infrastructure/providers/redis/redis.provider.js";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message.js";
import { SUCCESS_MESSAGE } from "../../../shared/constants/messages/success.message.js";
export class VerifyOtpUseCase {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(email, inputOtp) {
        const storedOtp = await redisClient.get(`otp:signup:${email}`);
        if (!storedOtp) {
            throw new Error(ERROR_MESSAGE.OTP_EXPIRED);
        }
        if (storedOtp !== inputOtp) {
            throw new Error(ERROR_MESSAGE.INVALID_OTP);
        }
        await redisClient.del(`otp:signup:${email}`);
        const user = await this.userRepo.findByEmail(email);
        if (!user)
            throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
        user.verifyUser();
        await this.userRepo.update(user);
        return { message: SUCCESS_MESSAGE.USER_VERIFIED };
    }
}
//# sourceMappingURL=verify-signup-otp.usecase.js.map