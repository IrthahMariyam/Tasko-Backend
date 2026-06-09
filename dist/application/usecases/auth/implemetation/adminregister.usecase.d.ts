import { IAdminRegisterUseCase } from "../interface/admin.register.interface.js";
import { AdminRegisterDTO } from "../../../dtos/auth/admin.register.dto.js";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository.js";
export declare class RegisterAdminUseCase implements IAdminRegisterUseCase {
    private _userRepository;
    constructor(_userRepository: IUserRepository);
    execute(dto: AdminRegisterDTO): Promise<{
        message: string;
    }>;
}
