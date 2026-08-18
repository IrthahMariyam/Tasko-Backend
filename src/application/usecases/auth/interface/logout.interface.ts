import { LogoutDTO } from "../../../dtos/auth/logout.register.dto";
export interface ILogoutUseCase {
  execute(dto: LogoutDTO): Promise<void>;
}
