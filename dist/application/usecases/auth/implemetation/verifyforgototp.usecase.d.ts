import { VerifyForgotOtpDTO } from "../../../dtos/auth/verify.forgototp.dto";
import { IVerifyForgotOtpUseCase } from "../interface/verifyforgot.otp.interface";
export declare class VerifyForgotPasswordOtpUseCase implements IVerifyForgotOtpUseCase {
    execute(dto: VerifyForgotOtpDTO): Promise<{
        message: string;
    }>;
}
