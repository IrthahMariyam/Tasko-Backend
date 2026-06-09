import { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
export declare class ResendSignupOtpUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(email: string): Promise<{
        message: string;
    }>;
}
