var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import crypto from "crypto";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { sendInviteEmail } from "../../../../shared/utils/send.invitation";
import { InternalLServerError } from "../../../../shared/utils/error-handling/errors/internal.server.error";
let InviteMemberUseCase = class InviteMemberUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(dto, invitedBy) {
        const email = dto.email.toLowerCase().trim();
        const existing = await this._userRepository.findByEmail(email);
        if (existing) {
            throw new InternalLServerError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
        }
        const token = crypto.randomBytes(20).toString("hex");
        const key = `member.invite:${token}`;
        await redisClient.set(key, JSON.stringify({
            name: dto.name,
            email,
            role: dto.role,
            invitedBy
        }), "EX", 172800);
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const inviteLink = `${frontendUrl}/member/accept?token=${token}`;
        await sendInviteEmail(email, inviteLink);
        return {
            message: "Invitation  send successfully",
            inviteLink: inviteLink
        };
    }
};
InviteMemberUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], InviteMemberUseCase);
export { InviteMemberUseCase };
//# sourceMappingURL=invite.member.usecase.js.map