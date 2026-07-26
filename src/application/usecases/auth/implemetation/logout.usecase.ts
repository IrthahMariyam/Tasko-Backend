import { injectable } from 'inversify'
import { ILogoutUseCase } from '../interface/logout.interface'
import { LogoutDTO } from '../../../dtos/auth/logout.register.dto'
import { redisClient } from '../../../../infrastructure/providers/redis/redis.provider'
import { verifyToken } from '../../../../shared/utils/jwt.utils'


@injectable()
export class LogoutUseCase implements ILogoutUseCase{

    constructor(){}

    async execute(dto:LogoutDTO):Promise<void>{
        const {refreshToken}=dto
        if(refreshToken){
            const decoded = verifyToken(refreshToken, 'refresh') as { email: string } | undefined;
            if (decoded?.email) {
                await redisClient.del(`refresh:${decoded.email}`);
            }
        }

}
}
