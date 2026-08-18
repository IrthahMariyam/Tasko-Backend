import { inject, injectable } from "inversify";
import { UserRole } from "../../../../domain/enum/user/role.enum";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { generateOTP } from "../../../../shared/utils/otp.generate.util";
import { sendOTP } from "../../../../shared/utils/send.otp.util";
import { IForgotPasswordUseCase } from "../interface/forgot.password.interface";

@injectable()
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    @inject(USER_TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ email }: { email: string }): Promise<{ message: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.userRepository.findByEmail(normalizedEmail);
    if (!user) throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
    if (user.role === UserRole.SUPER_ADMIN)
      throw new ValidationError(
        ERROR_MESSAGE.SUPER_ADMINS_CANNOT_CHANGE_PASSWORD,
      );

    const otp = generateOTP();
    const otpExpires = Number(process.env.FORGOT_OTP_EXPIRES);
    await redisClient.set(
      `forgot-otp:${normalizedEmail}`,
      otp,
      "EX",
      otpExpires,
    );
    await sendOTP(normalizedEmail, otp);
    return { message: SUCCESS_MESSAGE.OTP_SENT };
  }
}
