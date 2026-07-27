import { UserStatus } from "../../../../domain/enum/user/status.enum";

export interface IUpdateMemberStatusUseCase {
  execute(id: string, status: UserStatus): Promise<{ message: string }>;
}
