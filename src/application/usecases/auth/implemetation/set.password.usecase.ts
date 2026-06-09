import { ISetPassWordUseCase } from "../interface/set.password.interface";
import {injectable,inject} from 'inversify'
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
import { User } from "../../../../domain/entities/User";
import { UserRole } from "../../../../domain/enum/user/role.enum";
import { UserStatus } from "../../../../domain/enum/user/status.enum";


@injectable()
export class SetPasswordUseCase implements ISetPassWordUseCase{

    constructor(

        @inject(USER_TYPES.IUserRepository)
        private _userRepository:IUserRepository

    ){}

    async execute(token: string,password: string,confirmPassword: string):Promise<{ message: string }>{
        if(password !== confirmPassword){
            throw new ValidationError(ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH)
        }

        const inviteKey = `member.invite:${token}`
        const data = await redisClient.get(inviteKey)

        if(!data){
            throw new NotFoundError(ERROR_MESSAGE.INVITATION_EXPIRED_OR_INVALID)
        }

        const parsedData = JSON.parse(data)
        const existing = await this._userRepository.findByEmail(parsedData.email)

        if(existing){
            throw new ValidationError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS)
        }

        const hashedPassword = await hashPassword(password)
        const user = User.create({
            name: parsedData.name,
            email: parsedData.email,
            password: hashedPassword,
            role: parsedData.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER,
            status: UserStatus.ACTIVE,
            isVerified: true,
        })

        await this._userRepository.create(user)
        await redisClient.del(inviteKey)

        return { message: SUCCESS_MESSAGE.USER_CREATED }
    }
}
