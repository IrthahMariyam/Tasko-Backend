import { UserStatus } from "../../../../domain/enum/user/status.enum";
import { UserRole } from "../../../../domain/enum/user/role.enum";

export interface IUpdateMemberStatusUseCase {
  execute(
    id: string,
    status: UserStatus,
    actorRole: UserRole,
  ): Promise<{ message: string }>;
}
