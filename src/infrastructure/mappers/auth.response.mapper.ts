import { injectable } from "inversify";
import { plainToInstance } from "class-transformer";
import { User } from "../../domain/entities/User";
import {
  UserProfileResponseDTO,
  LoginResponseDTO,
  LogoutResponseDTO,
  RefreshResponseDTO,
  SetPasswordResponseDTO,
  ForgotPasswordResponseDTO,
  VerifyForgotOtpResponseDTO,
  ResetPasswordResponseDTO,
} from "../../application/dtos/responses/auth.response.dto";
import type { AuthResult } from "../../domain/types/auth.result.types";

@injectable()
export class AuthResponseMapper {
  toUserProfileResponse(
    user: User | NonNullable<AuthResult["user"]>,
  ): UserProfileResponseDTO {
    return plainToInstance(UserProfileResponseDTO, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      designation: user.designation,
      joiningDate: user.joiningDate,
      profileImage: user.profileImage,
      isVerified: user instanceof User ? user.isVerified : undefined,
    });
  }

  toLoginResponse(result: AuthResult): LoginResponseDTO {
    return plainToInstance(LoginResponseDTO, {
      message: result.message,
      user: this.toUserProfileResponse(result.user!),
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      role: result.user?.role,
    });
  }

  toLogoutResponse(message: string): LogoutResponseDTO {
    return plainToInstance(LogoutResponseDTO, {
      message,
      success: true,
    });
  }

  toRefreshResponse(result: AuthResult): RefreshResponseDTO {
    return plainToInstance(RefreshResponseDTO, {
      message: result.message,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: this.toUserProfileResponse(result.user!),
    });
  }

  toSetPasswordResponse(message: string, user?: User): SetPasswordResponseDTO {
    return plainToInstance(SetPasswordResponseDTO, {
      message,
      success: true,
      user: user ? this.toUserProfileResponse(user) : undefined,
    });
  }

  toForgotPasswordResponse(message: string): ForgotPasswordResponseDTO {
    return plainToInstance(ForgotPasswordResponseDTO, {
      message,
      success: true,
      otpSent: true,
    });
  }

  toVerifyForgotOtpResponse(message: string): VerifyForgotOtpResponseDTO {
    return plainToInstance(VerifyForgotOtpResponseDTO, {
      message,
      success: true,
      verified: true,
    });
  }

  toResetPasswordResponse(message: string): ResetPasswordResponseDTO {
    return plainToInstance(ResetPasswordResponseDTO, {
      message,
      success: true,
      passwordReset: true,
    });
  }
}
