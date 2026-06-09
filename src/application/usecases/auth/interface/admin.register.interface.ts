import {AdminRegisterDTO} from "../../../dtos/auth/admin.register.dto.js";
export interface IAdminRegisterUseCase {
    execute(dto: AdminRegisterDTO): Promise<{message: string}>;
}