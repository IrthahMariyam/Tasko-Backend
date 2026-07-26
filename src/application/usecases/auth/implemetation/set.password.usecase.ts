import { inject, injectable } from "inversify";
import { User } from "../../../../domain/entities/User";
import { UserRole } from "../../../../domain/enum/user/role.enum";
import { UserStatus } from "../../../../domain/enum/user/status.enum";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
import { ISetPassWordUseCase } from "../interface/set.password.interface";

type InvitePayload = { name: string; email: string; role: UserRole };

@injectable()
export class SetPasswordUseCase implements ISetPassWordUseCase {
  constructor(@inject(USER_TYPES.IUserRepository) private readonly userRepository: IUserRepository) {}

  async execute(token: string, password: string, confirmPassword: string): Promise<{ message: string }> {
    if (password !== confirmPassword) throw new ValidationError(ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH);

    const key = `member.invite:${token}`;
    const invitation = await redisClient.get(key);
    if (!invitation) throw new NotFoundError(ERROR_MESSAGE.INVITATION_EXPIRED_OR_INVALID);

    const { name, email, role } = JSON.parse(invitation) as InvitePayload;
    if (await this.userRepository.findByEmail(email)) throw new ValidationError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);

    await this.userRepository.create(User.create({
      name,
      email,
      password: await hashPassword(password),
      role,
      status: UserStatus.ACTIVE,
      isVerified: true,
    }));
    await redisClient.del(key);

    return { message: SUCCESS_MESSAGE.PASSWORD_SET_SUCCESS };
  }
}
