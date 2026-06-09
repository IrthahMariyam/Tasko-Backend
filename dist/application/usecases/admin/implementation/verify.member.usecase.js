var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from "inversify";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
let VerifyInvitationUseCase = class VerifyInvitationUseCase {
    constructor() { }
    async execute(token) {
        const Invitetoken = `member.invite:${token}`;
        const data = await redisClient.get(Invitetoken);
        if (!data) {
            throw new NotFoundError(ERROR_MESSAGE.INVITATION_EXPIRED_OR_INVALID);
        }
        const parsedData = JSON.parse(data);
        return {
            name: parsedData.name,
            email: parsedData.email,
            role: parsedData.role
        };
    }
};
VerifyInvitationUseCase = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], VerifyInvitationUseCase);
export { VerifyInvitationUseCase };
//# sourceMappingURL=verify.member.usecase.js.map