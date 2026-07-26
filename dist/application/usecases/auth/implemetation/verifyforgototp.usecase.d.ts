import { IVerifyForgotOtpUseCase } from "../interface/verifyforgot.otp.interface";
export declare class VerifyForgotPasswordOtpUseCase implements IVerifyForgotOtpUseCase {
    execute({ email, otp }: {
        email: string;
        otp: string;
    }): Promise<{
        message: string;
    }>;
}
