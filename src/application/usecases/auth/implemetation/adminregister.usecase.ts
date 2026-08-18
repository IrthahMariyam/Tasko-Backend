import { inject, injectable } from "inversify";
import { IAdminRegisterUseCase } from "../interface/admin.register.interface";
import { AdminRegisterDTO } from "../../../dtos/auth/admin.register.dto";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
import { generateOTP } from "../../../../shared/utils/otp.generate.util";
import { sendOTP } from "../../../../shared/utils/send.otp.util";
import { UserRole } from "../../../../domain/enum/user/role.enum";

@injectable()
export class RegisterAdminUseCase implements IAdminRegisterUseCase {
  constructor(
    @inject(USER_TYPES.IUserRepository)
    private _userRepository: IUserRepository,
  ) {}

  async execute(dto: AdminRegisterDTO): Promise<{ message: string }> {
    const email = dto.email.toLowerCase().trim();
    const existing = await this._userRepository.findByEmail(email);
    if (existing) throw new Error(ERROR_MESSAGE.USER_ALREADY_EXISTS);

    const hashed = await hashPassword(dto.password);

    const otp = generateOTP();
    const otpExpires = Number(process.env.FORGOT_OTP_EXPIRES);
    await redisClient.setex(
      `admin.otp:${email}`,
      otpExpires,

      JSON.stringify({
        name: dto.name,
        email,
        password: hashed,
        role: UserRole.ADMIN,
        otp,
      }),
    );

    await sendOTP(email, otp);
    console.log(otp);

    return {
      message: SUCCESS_MESSAGE.OTP_SENT,
    };
  }
}
