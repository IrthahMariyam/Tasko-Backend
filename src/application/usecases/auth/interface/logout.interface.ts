import { LogoutDTO } from "../../../dtos/auth/logout.register.dto.js";
export interface ILogoutUseCase {
    execute(dto:LogoutDTO):Promise<void>
}


