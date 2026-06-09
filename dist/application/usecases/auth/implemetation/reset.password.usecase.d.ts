import { IResetPasswordUseCase } from "../interface/reset.password.interface";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { ResetPasswordDTO } from "../../../dtos/auth/reset.password.dto";
export declare class ResetPasswordUseCase implements IResetPasswordUseCase {
    private _userRepository;
    constructor(_userRepository: IUserRepository);
    execute({ email, newPassword, confirmPassword }: ResetPasswordDTO): Promise<{
        message: string;
    }>;
}
