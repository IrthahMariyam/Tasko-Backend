import { IForgotPasswordUseCase } from "../interface/forgot.password.interface";
import { ForgotPasswordDTO } from "../../../dtos/auth/forgot.password.dto";
import { injectable,inject } from "inversify";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { generateOTP } from "../../../../shared/utils/otp.generate.util";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { sendOTP } from "../../../../shared/utils/send.otp.util";

   @injectable()
export class ForgotPasswordUseCase implements IForgotPasswordUseCase{

 
    constructor(
        @inject(USER_TYPES.IUserRepository)
        private  _userRepository:IUserRepository
    ){}

    async execute({email}: ForgotPasswordDTO): Promise<{ message: string; }> {
        
        
        const existing = this._userRepository.findByEmail(email)
        if(!existing)throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND)

            const otp = generateOTP()
            const expiryTime = 5 * 60 

            await redisClient.setex(`forgot-otp:${email}`,expiryTime,JSON.stringify({otp}))

            console.log(email,otp);

            await sendOTP(email,otp)
            return {
                message:'forgot password otp is sended'
            }
    }
}