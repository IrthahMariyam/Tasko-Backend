import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { generateOTP } from "../../../../shared/utils/otp.generate.util";
import { sendOTP } from "../../../../shared/utils/send.otp.util";
import { ResendAdminOtpDTO } from "../../../dtos/auth/resend.otp.dto";
import { IResendAdminOtpUseCase } from "../interface/resend.register.otp.interface";

@injectable()
export class ResendAdminOtpUseCase implements IResendAdminOtpUseCase {
    constructor(
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    ) {}

    async execute(dto: ResendAdminOtpDTO): Promise<{ message: string }> {
        const email = dto.email.toLowerCase().trim()
        const existing = await this._userRepository.findByEmail(email)
        if (existing) throw new ValidationError(ERROR_MESSAGE.USER_ALREADY_EXISTS)

        const data = await redisClient.get(`admin.otp:${email}`)
        if (!data) throw new NotFoundError(ERROR_MESSAGE.OTP_EXPIRED)

        const parsedData = JSON.parse(data)
        const otp = generateOTP()

        await redisClient.setex(
            `admin.otp:${email}`,
            15 * 60,
            JSON.stringify({
                ...parsedData,
                otp,
            }),
        )

        await sendOTP(email, otp)

        return { message: SUCCESS_MESSAGE.OTP_SENT }
    }
}
