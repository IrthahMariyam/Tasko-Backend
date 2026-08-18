import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class UserProfileResponseDTO {
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
export class LoginResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  @Type(() => UserProfileResponseDTO)
  user!: UserProfileResponseDTO;

  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;

  @Expose()
  role!: string;
}

@Exclude()
export class LogoutResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  success!: boolean;
}

@Exclude()
export class RefreshResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;

  @Expose()
  @Type(() => UserProfileResponseDTO)
  user!: UserProfileResponseDTO;
}

@Exclude()
export class SetPasswordResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  success!: boolean;

  @Expose()
  @Type(() => UserProfileResponseDTO)
  user?: UserProfileResponseDTO;
}

@Exclude()
export class ForgotPasswordResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  success!: boolean;

  @Expose()
  otpSent?: boolean;
}

@Exclude()
export class VerifyForgotOtpResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  success!: boolean;

  @Expose()
  verified?: boolean;
}

@Exclude()
export class ResetPasswordResponseDTO {
  @Expose()
  message!: string;

  @Expose()
  success!: boolean;

  @Expose()
  passwordReset?: boolean;
}
