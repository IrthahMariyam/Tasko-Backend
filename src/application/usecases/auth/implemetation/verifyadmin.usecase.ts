import { inject,injectable} from 'inversify'
import {IVerifyOtpUseCase} from '../interface/verifyadmin.otp.interface'
import { VerifyOtpDTO } from '../../../dtos/auth/verify.admin.dto'
import { USER_TYPES } from '../../../../infrastructure/di/types/user/user.types'
import { IUserRepository } from '../../../../domain/interfaces/IUserRepository'
import { redisClient } from '../../../../infrastructure/providers/redis/redis.provider'
import { NotFoundError } from '../../../../shared/utils/error-handling/errors/not.found.error'
import { ERROR_MESSAGE } from '../../../../shared/constants/messages/error.message'
import { SUCCESS_MESSAGE } from '../../../../shared/constants/messages/success.message'
import { ValidationError } from '../../../../shared/utils/error-handling/errors/validation.error'
import { User } from '../../../../domain/entities/User'
import { UserRole } from '../../../../domain/enum/user/role.enum'
import { UserStatus } from '../../../../domain/enum/user/status.enum'
import { InternalLServerError } from '../../../../shared/utils/error-handling/errors/internal.server.error'

@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase{

    constructor(
        @inject(USER_TYPES.IUserRepository)private readonly _userRepository:IUserRepository,
    ){}


    async execute(dto:VerifyOtpDTO):Promise <{message:string;user:{id?:string;name:string;email:string;};}>{

      
        const email = dto.email.toLowerCase().trim()
        const data = await redisClient.get(`admin.otp:${email}`)
        if(!data) throw new NotFoundError(ERROR_MESSAGE.OTP_EXPIRED)
        const parsedData=JSON.parse(data)
            if(parsedData.otp.toString()!==dto.otp.toString()){
                throw new ValidationError(ERROR_MESSAGE.INVALID_OTP)
            }

        const existing = await this._userRepository.findByEmail(email)
        if (existing) throw new ValidationError(ERROR_MESSAGE.USER_ALREADY_EXISTS)
            
        const admin= User.create({
            name : parsedData.name,
            email:parsedData.email,
            password:parsedData.password,
            role:UserRole.ADMIN,
            status:UserStatus.ACTIVE,
            isVerified:true,

        })

        console.log(`admin:${admin}`)

        
        const adminSaved =  await this._userRepository.create(admin)
        if(!adminSaved)throw new InternalLServerError('Failed to create admin')
        await redisClient.del(`admin.otp:${email}`)
            return {message: SUCCESS_MESSAGE.ADMIN_REGISTERED,
        user:{
            id:adminSaved.id?.toString(),
            name:adminSaved.name,
            email:adminSaved.email
        }}
    }
}
