import { injectable,inject } from "inversify";
import { IVerifyInvitationUseCase } from "../interface/verify.member.interface";
import { ADMIN_TYPES } from "../../../../infrastructure/di/types/admin/admin.types";
import { AUTH_TYPES } from "../../../../infrastructure/di/types/auth/auth.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";



 @injectable()
export class VerifyInvitationUseCase implements IVerifyInvitationUseCase{

    constructor(){}

    async execute(token:string): Promise<{ name: string; email: string; role: string; }> {
        
        const Invitetoken = `member.invite:${token}`

        const data = await redisClient.get(Invitetoken)

        if(!data){
            throw new NotFoundError(ERROR_MESSAGE.INVITATION_EXPIRED_OR_INVALID)
        }
        const parsedData = JSON.parse(data)

        return {
            name:parsedData.name,
            email:parsedData.email,
            role:parsedData.role

        }
    }
   

}
