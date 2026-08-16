import { Exclude, Expose } from "class-transformer";
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

@Exclude()
export class ResetPasswordDTO {
  @Expose()
  @IsEmail({}, { message: "Enter a valid email address" })
  email!: string;

  @Expose()
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(64, { message: "Password cannot exceed 64 characters" })
  @Matches(/^(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain 1 uppercase letter and 1 number",
  })
  newPassword!: string;

  @Expose()
  @IsString({ message: "Confirm password must be a string" })
  @MinLength(8, { message: "Confirm password must be at least 8 characters" })
  confirmPassword!: string;
}
