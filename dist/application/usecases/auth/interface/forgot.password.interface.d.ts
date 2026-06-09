import { ForgotPasswordDTO } from "../../../dtos/auth/forgot.password.dto.js";
export interface IForgotPasswordUseCase {
    execute(email: ForgotPasswordDTO): Promise<{
        message: string;
    }>;
}
