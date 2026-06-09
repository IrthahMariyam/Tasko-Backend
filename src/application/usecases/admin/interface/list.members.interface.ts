import { UserStatus } from "../../../../domain/enum/user/status.enum";

export interface IListMembersUseCase {
  execute(): Promise<{
    data: Array<{name: string; email: string;role: string;status: UserStatus;}>;   
  }>;
}