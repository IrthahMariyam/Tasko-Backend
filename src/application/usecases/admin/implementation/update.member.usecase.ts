import { inject, injectable } from "inversify";
import { IUpdateMemberStatusUseCase } from "../interface/update.member.interface";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { UserStatus } from "../../../../domain/enum/user/status.enum";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { User } from "../../../../domain/entities/User";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { UserRole } from "../../../../domain/enum/user/role.enum";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";

@injectable()
export class UpdateMemberStatusUseCase implements IUpdateMemberStatusUseCase {
  constructor(
    @inject(USER_TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    id: string,
    status: UserStatus,
    actorRole: UserRole,
  ): Promise<{ message: string }> {
    const user = await this._userRepository.findById(id);
    if (!user) throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);

    if (user.role === UserRole.SUPER_ADMIN) {
      throw new ValidationError("Super admin accounts cannot be blocked or unblocked.");
    }

    if (actorRole === UserRole.ADMIN && user.role !== UserRole.USER) {
      throw new ValidationError("Admins can update employee accounts only.");
    }

    const updatedUser = User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: status,
      designation: user.designation,
      joiningDate: user.joiningDate,
      profileImage: user.profileImage,
      isVerified: user.isVerified ?? false,
    });

    await this._userRepository.update(updatedUser);

    return {
      message:
        status === UserStatus.BLOCKED ? "User blocked" : "User unblocked",
    };
  }
}
