import { inject, injectable } from "inversify";
import { IUpdateMemberStatusUseCase } from "../interface/update.member.interface";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { UserStatus } from "../../../../domain/enum/user/status.enum";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { User } from "../../../../domain/entities/User";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";

@injectable()
export class UpdateMemberStatusUseCase implements IUpdateMemberStatusUseCase {
  constructor(
    @inject(USER_TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(id: string, status: UserStatus): Promise<{ message: string }> {
    const user = await this._userRepository.findById(id);
    if (!user) throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);

    const updatedUser = User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: status,
      isVerified: user.isVerified ?? false,
    });

    await this._userRepository.update(updatedUser);

    return {
      message:
        status === UserStatus.BLOCKED ? "User blocked" : "User unblocked",
    };
  }
}
