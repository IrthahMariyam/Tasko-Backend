import { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
export declare class VerifyOtpUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(email: string, inputOtp: string): Promise<{
        message: string;
    }>;
}
