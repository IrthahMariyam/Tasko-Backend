import { ISetPassWordUseCase } from "../interface/set.password.interface";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
export declare class SetPasswordUseCase implements ISetPassWordUseCase {
    private _userRepository;
    constructor(_userRepository: IUserRepository);
    execute(token: string, password: string, confirmPassword: string): Promise<{
        message: string;
    }>;
}
