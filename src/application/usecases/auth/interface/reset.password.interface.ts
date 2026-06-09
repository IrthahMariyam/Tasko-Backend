import {ResetPasswordDTO} from '../../../dtos/auth/reset.password.dto.js'
export interface IResetPasswordUseCase{
    execute(dto:ResetPasswordDTO):Promise<{message:string}>
}
