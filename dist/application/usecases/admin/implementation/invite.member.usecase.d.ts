import { IInviteMemberUseCase } from "../interface/invite.member.interface";
import { IUserRepository } from "../../../../infrastructure/db/repository/interface/user.interface";
import { InviteMemberDTO } from "../../../dtos/admin/invite.member.dto";
import { User } from "../../../../domain/entities/User";
export declare class InviteMemberUseCase implements IInviteMemberUseCase {
    private _userRepository;
    constructor(_userRepository: IUserRepository<User>);
    execute(dto: InviteMemberDTO, invitedBy: string): Promise<{
        message: string;
        inviteLink: string;
    }>;
}
