import { User } from "../../../domain/entities/User.js";
import { hashPassword } from "../../../shared/utils/password.hash.util.js";
import { generateOTP } from "../../../shared/utils/otp.generate.util.js";
import { sendOTP } from "../../../shared/utils/send.otp.util.js";
import { redisClient } from "../../../infrastructure/providers/redis/redis.provider.js";
import { UserRole } from "../../../domain/enum/user/role.enum.js";
import { UserStatus } from "../../../domain/enum/user/status.enum.js";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message.js";
import { SUCCESS_MESSAGE } from "../../../shared/constants/messages/success.message.js";
export class SignupUseCase {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(name, email, password) {
        const existing = await this.userRepo.findByEmail(email);
        if (existing)
            throw new Error(ERROR_MESSAGE.USER_ALREADY_EXISTS);
        const hashed = await hashPassword(password);
        const user = User.create({
            name,
            email,
            password: hashed,
            role: UserRole.ADMIN,
            status: UserStatus.PENDING,
            isVerified: false,
        });
        await this.userRepo.create(user);
        const otp = generateOTP();
        await redisClient.set(`otp:signup:${email}`, otp, "EX", 300);
        await sendOTP(email, otp);
        return { message: SUCCESS_MESSAGE.OTP_SENT };
    }
}
//# sourceMappingURL=signup.usecase.js.map