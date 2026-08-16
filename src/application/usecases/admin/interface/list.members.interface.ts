import { UserStatus } from "../../../../domain/enum/user/status.enum";

export interface IListMembersUseCase {
  execute(opts: { page?: number; limit?: number; search?: string }): Promise<{
    data: Array<{
      id: string;
      name: string;
      email: string;
      role: string;
      status: UserStatus;
    }>;
    total: number;
    page: number;
    limit: number;
  }>;
}
