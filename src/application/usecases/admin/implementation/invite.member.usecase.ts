import { inject, injectable } from "inversify";
import { IInviteMemberUseCase } from "../interface/invite.member.interface";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../infrastructure/db/repository/interface/user.interface";
import { InviteMemberDTO } from "../../../dtos/admin/invite.member.dto";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import crypto from "crypto";
import { User } from "../../../../domain/entities/User";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { sendInviteEmail } from "../../../../shared/utils/send.invitation";
import { InternalLServerError } from "../../../../shared/utils/error-handling/errors/internal.server.error";

@injectable()
export class InviteMemberUseCase implements IInviteMemberUseCase {
  constructor(
    @inject(USER_TYPES.IUserRepository)
    private _userRepository: IUserRepository<User>,
  ) {}

  async execute(
    dto: InviteMemberDTO,
    invitedBy: string,
  ): Promise<{ message: string; inviteLink: string }> {
    const email = dto.email.toLowerCase().trim();
    const existing = await this._userRepository.findByEmail(email);
    if (existing) {
      throw new InternalLServerError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
    }

    const token = crypto.randomBytes(20).toString("hex");

    const key = `member.invite:${token}`;
    const inviteExpires = Number(process.env.INVITE_EXPIRES);
    await redisClient.set(
      key,
      JSON.stringify({
        name: dto.name,
        email,
        role: dto.role,
        designation: dto.designation,
        invitedBy,
      }),

      "EX",
      inviteExpires,
    );

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      throw new InternalLServerError("FRONTEND_URL is not configured.");
    }

    const inviteLink = `${frontendUrl.replace(/\/$/, "")}/member/accept?token=${token}`;
    await sendInviteEmail(email, inviteLink);

    return {
      message: SUCCESS_MESSAGE.INVITATION_SENT,
      inviteLink,
    };
  }
}
