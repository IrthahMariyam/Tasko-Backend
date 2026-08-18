import { injectable } from "inversify";
import { plainToInstance } from "class-transformer";
import { User } from "../../domain/entities/User";
import {
  MemberResponseDTO,
  MembersListResponseDTO,
  InviteMemberResponseDTO,
  VerifyInvitationResponseDTO,
  UpdateMemberStatusResponseDTO,
} from "../../application/dtos/responses/admin.response.dto";

@injectable()
export class AdminResponseMapper {
  toMemberResponse(user: User): MemberResponseDTO {
    return plainToInstance(MemberResponseDTO, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      designation: user.designation,
      joiningDate: user.joiningDate,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
    });
  }

  toMembersListResponse(
    members: User[],
    page: number,
    limit: number,
    total: number,
  ): MembersListResponseDTO {
    return plainToInstance(MembersListResponseDTO, {
      message: "Members retrieved successfully",
      data: members.map((member) => this.toMemberResponse(member)),
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  }

  toInviteMemberResponse(email: string): InviteMemberResponseDTO {
    return plainToInstance(InviteMemberResponseDTO, {
      message: "Invitation sent successfully",
      success: true,
      invitationSent: true,
      email,
    });
  }

  toVerifyInvitationResponse(
    email: string,
    designation: string,
    role: string,
  ): VerifyInvitationResponseDTO {
    return plainToInstance(VerifyInvitationResponseDTO, {
      message: "Invitation verified successfully",
      success: true,
      verified: true,
      email,
      designation,
      role,
    });
  }

  toUpdateMemberStatusResponse(
    message: string,
    member?: User,
  ): UpdateMemberStatusResponseDTO {
    return plainToInstance(UpdateMemberStatusResponseDTO, {
      message,
      success: true,
      statusUpdated: true,
      member: member ? this.toMemberResponse(member) : undefined,
    });
  }
}
