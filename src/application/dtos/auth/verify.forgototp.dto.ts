import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";

@Exclude()
export class VerifyForgotOtpDTO {
  @Expose()
  @IsEmail({}, { message: "Enter a valid email address" })
  email!: string;

  @Expose()
  @IsString({ message: "OTP must be a string" })
  @Length(6, 6, { message: "OTP must be 6 digits" })
  otp!: string;
}
