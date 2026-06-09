import { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
export declare class LoginUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(email: string, password: string): Promise<{
        message: string;
        accessToken: string;
    }>;
}
