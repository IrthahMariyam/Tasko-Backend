import { IVerifyOtpUseCase } from '../interface/verifyadmin.otp.interface';
import { VerifyOtpDTO } from '../../../dtos/auth/verify.admin.dto';
import { IUserRepository } from '../../../../domain/interfaces/IUserRepository';
export declare class VerifyOtpUseCase implements IVerifyOtpUseCase {
    private readonly _userRepository;
    constructor(_userRepository: IUserRepository);
    execute(dto: VerifyOtpDTO): Promise<{
        message: string;
        user: {
            id?: string;
            name: string;
            email: string;
        };
    }>;
}
