import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class MemberResponseDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: string;

  @Expose()
  status!: string;

  @Expose()
  designation?: string;

  @Expose()
  @Type(() => Date)
  joiningDate?: Date;

  @Expose()
  profileImage?: string;

  @Expose()
  isVerified?: boolean;
}

@Exclude()
export class MembersListResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  @Type(() => MemberResponseDTO)
  data!: MemberResponseDTO[];

  @Expose()
  meta!: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

@Exclude()
export class InviteMemberResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  success!: boolean;

  @Expose()
  invitationSent?: boolean;

  @Expose()
  email?: string;
}

@Exclude()
export class VerifyInvitationResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  success!: boolean;

  @Expose()
  verified?: boolean;

  @Expose()
  email?: string;

  @Expose()
  designation?: string;

  @Expose()
  role?: string;
}

@Exclude()
export class UpdateMemberStatusResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  success!: boolean;

  @Expose()
  statusUpdated?: boolean;

  @Expose()
  @Type(() => MemberResponseDTO)
  member?: MemberResponseDTO;
}
