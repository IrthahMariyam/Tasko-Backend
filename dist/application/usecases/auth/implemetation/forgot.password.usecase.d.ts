import { IForgotPasswordUseCase } from "../interface/forgot.password.interface";
import { ForgotPasswordDTO } from "../../../dtos/auth/forgot.password.dto";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
export declare class ForgotPasswordUseCase implements IForgotPasswordUseCase {
    private _userRepository;
    constructor(_userRepository: IUserRepository);
    execute({ email }: ForgotPasswordDTO): Promise<{
        message: string;
    }>;
}
