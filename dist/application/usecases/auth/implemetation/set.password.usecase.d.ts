import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { ISetPassWordUseCase } from "../interface/set.password.interface";
export declare class SetPasswordUseCase implements ISetPassWordUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(token: string, password: string, confirmPassword: string): Promise<{
        message: string;
    }>;
}
