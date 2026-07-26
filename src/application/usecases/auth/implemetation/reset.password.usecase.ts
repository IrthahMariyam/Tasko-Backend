import { inject, injectable } from "inversify";
import { User } from "../../../../domain/entities/User";
import { UserRole } from "../../../../domain/enum/user/role.enum";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
import { IResetPasswordUseCase } from "../interface/reset.password.interface";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(@inject(USER_TYPES.IUserRepository) private readonly userRepository: IUserRepository) {}

  async execute({ email, newPassword, confirmPassword }: { email: string; newPassword: string; confirmPassword: string }): Promise<{ message: string }> {
    if (newPassword !== confirmPassword) throw new ValidationError(ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH);
    const normalizedEmail = email.toLowerCase().trim();
    if (await redisClient.get(`forgot-reset:${normalizedEmail}`) !== "verified") throw new ValidationError("Verify the OTP before resetting your password.");

    const user = await this.userRepository.findByEmail(normalizedEmail);
    if (!user) throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
    if (user.role === UserRole.ADMIN) throw new ValidationError("Admins can't change their password.");

    await this.userRepository.update(User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: await hashPassword(newPassword),
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
    }));
    await redisClient.del(`forgot-reset:${normalizedEmail}`);
    return { message: "Password reset successfully" };
  }
}
