import { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
export declare class SignupUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(name: string, email: string, password: string): Promise<{
        message: string;
    }>;
}
