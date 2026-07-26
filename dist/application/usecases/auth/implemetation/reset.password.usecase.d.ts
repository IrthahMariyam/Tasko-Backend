import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { IResetPasswordUseCase } from "../interface/reset.password.interface";
export declare class ResetPasswordUseCase implements IResetPasswordUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute({ email, newPassword, confirmPassword }: {
        email: string;
        newPassword: string;
        confirmPassword: string;
    }): Promise<{
        message: string;
    }>;
}
