import { InviteMemberDTO } from "../../../dtos/admin/invite.member.dto";

export interface IInviteMemberUseCase{
    execute(dto:InviteMemberDTO,invitedby:string):Promise<  
        {message: string,
        inviteLink: string }>
}
