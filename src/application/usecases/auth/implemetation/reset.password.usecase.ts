import { injectable,inject } from "inversify";
import { IResetPasswordUseCase } from "../interface/reset.password.interface";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { ResetPasswordDTO } from "../../../dtos/auth/reset.password.dto";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { User } from "../../../../domain/entities/User";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
import { InternalLServerError } from "../../../../shared/utils/error-handling/errors/internal.server.error";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase{

    constructor(
        @inject(USER_TYPES.IUserRepository)
        private _userRepository:IUserRepository
    ){}

     async execute({email,newPassword,confirmPassword}:ResetPasswordDTO):Promise<{message:string;}>{
         if(newPassword !== confirmPassword){

            throw new ValidationError(ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH)
            
        }
        const user = await this._userRepository.findByEmail(email)
        if(!user){
            throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND)
        }
        const hashedPassword =  await hashPassword(newPassword)
        const newData = User.create({
                     id:user.id,
                name:user.name,
                email:user.email,
                password:hashedPassword,
                role:user.role,
                status:user.status,
                isVerified:true,

        }) 
      
      const result =   await this._userRepository.update(newData)
      if(!result){
        throw new InternalLServerError(ERROR_MESSAGE.SERVER_ERROR)

      }
      return { message:SUCCESS_MESSAGE.PASSWORD_RESET     }
    }
}