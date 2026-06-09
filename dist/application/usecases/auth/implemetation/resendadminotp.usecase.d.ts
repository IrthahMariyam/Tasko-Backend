import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { ResendAdminOtpDTO } from "../../../dtos/auth/resend.otp.dto";
import { IResendAdminOtpUseCase } from "../interface/resend.register.otp.interface";
export declare class ResendAdminOtpUseCase implements IResendAdminOtpUseCase {
    private readonly _userRepository;
    constructor(_userRepository: IUserRepository);
    execute(dto: ResendAdminOtpDTO): Promise<{
        message: string;
    }>;
}
