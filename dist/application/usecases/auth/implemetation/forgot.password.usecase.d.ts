import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { IForgotPasswordUseCase } from "../interface/forgot.password.interface";
export declare class ForgotPasswordUseCase implements IForgotPasswordUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute({ email }: {
        email: string;
    }): Promise<{
        message: string;
    }>;
}
