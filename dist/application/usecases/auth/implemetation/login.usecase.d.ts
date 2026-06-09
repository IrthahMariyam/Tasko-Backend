import { LoginDTO } from "../../../dtos/auth/login.dto";
import { ILoginUseCase } from "../interface/login.interface";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { AuthResult } from "../../../../domain/types/auth.result.types";
export declare class LoginUseCase implements ILoginUseCase {
    private _userRepository;
    constructor(_userRepository: IUserRepository);
    execute(dto: LoginDTO): Promise<AuthResult>;
}
