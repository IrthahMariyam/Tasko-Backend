import { VerifyOtpDTO } from "../../../dtos/auth/verify.admin.dto.js";
export interface IVerifyOtpUseCase {
    execute(dto: VerifyOtpDTO): Promise<{
        message: string;
        user: {
            id?: string;
            name: string;
            email: string;
        };
    }>;
}
