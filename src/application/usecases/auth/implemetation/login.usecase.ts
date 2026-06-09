import { LoginDTO } from "../../../dtos/auth/login.dto";
import {inject,injectable} from 'inversify'
import { ILoginUseCase } from "../interface/login.interface";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { AuthResult } from "../../../../domain/types/auth.result.types";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { comparePassword } from "../../../../shared/utils/password.hash.util";
import { generateRefreshToken,generateAccessToken } from "../../../../shared/utils/jwt.utils";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";

const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60

@injectable()
export class LoginUseCase implements ILoginUseCase{

    constructor( 
        @inject(USER_TYPES.IUserRepository)private _userRepository: IUserRepository
            ){}
            async execute(dto: LoginDTO): Promise<AuthResult> {
                const email=dto.email.toLowerCase().trim()
                const user = await this._userRepository.findByEmail(email)
                if(!user) throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND)
                if(!user.isVerified) throw new Error(ERROR_MESSAGE.USER_NOT_VERIFIED_OR_BLOCKED)
                const isPassword= await comparePassword(dto.password, user.password)
                     if (!isPassword) throw new ValidationError(ERROR_MESSAGE.INVALID_PASSWORD)
                         const payload = { id: user.id, email: user.email, role: user.role }
                        const accessToken = generateAccessToken(payload)
            const refreshToken = generateRefreshToken(payload)



            await redisClient.set(
                `refresh:${user.email}`,
                refreshToken,
                "EX",
                REFRESH_TOKEN_TTL_SECONDS
            )

            return {
                message: SUCCESS_MESSAGE.LOGIN_SUCCESS,
                accessToken,
                refreshToken,
                user: {
                    id: user.id?.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status:user.status

                }
            }

                    
                

            }
}
