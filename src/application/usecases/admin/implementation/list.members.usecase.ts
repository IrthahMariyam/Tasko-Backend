import { inject, injectable } from "inversify";
import { IListMembersUseCase } from "../interface/list.members.interface";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { UserStatus } from "../../../../domain/enum/user/status.enum";

@injectable()
export class ListMembersUseCase implements IListMembersUseCase {
  constructor(
    @inject(USER_TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    opts: { page?: number; limit?: number; search?: string } = {},
  ): Promise<{
    data: Array<{
      id: string;
      name: string;
      email: string;
      role: string;
      designation: string;
      joiningDate: string;
      profileImage: string;
      status: UserStatus;
    }>;
    total: number;
    page: number;
    limit: number;
  }> {
    const page = opts.page && opts.page > 0 ? opts.page : 1;
    const limit = opts.limit && opts.limit > 0 ? opts.limit : 50;
    const { items, total } = await this._userRepository.findWithQuery({
      page,
      limit,
      search: opts.search,
    });
    const data = items.map((user) => ({
      id: user.id ?? "",
      name: user.name,
      email: user.email,
      role: user.role,
      designation: user.designation ?? "",
      joiningDate: user.joiningDate
        ? new Date(user.joiningDate).toISOString()
        : new Date().toISOString(),
      profileImage: user.profileImage ?? "",
      status: user.status,
    }));

    return { data, total, page, limit };
  }
}
