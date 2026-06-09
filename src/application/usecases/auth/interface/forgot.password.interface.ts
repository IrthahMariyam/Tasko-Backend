import { ForgotPasswordDTO} from "../../../dtos/auth/forgot.password.dto.js";

export interface IForgotPasswordUseCase {
    //execute(dto: ForgotPasswordDTO): Promise<{message: string}>;
     execute(email: ForgotPasswordDTO): Promise<{message: string}>;
}