import { ResendAdminOtpDTO } from "../../../dtos/auth/resend.otp.dto.js";
export interface IResendAdminOtpUseCase {
    execute(dto: ResendAdminOtpDTO): Promise<any>;
}