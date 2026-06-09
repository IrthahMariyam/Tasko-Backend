import { VerifyForgotOtpDTO } from "../../../dtos/auth/verify.forgototp.dto";
export interface IVerifyForgotOtpUseCase {
    execute(dto: VerifyForgotOtpDTO): Promise<{
        message: string;
    }>;
}
