import { Exclude, Expose } from "class-transformer";
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from "class-validator";

@Exclude()
export class SetPasswordDTO {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: "Token is required" })
  token!: string;

  @Expose()
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20, { message: "Password cannot exceed 20 characters" })
  @Matches(/^(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain 1 uppercase letter and 1 number",
  })
  password!: string;

  @Expose()
  @IsString()
  @MinLength(8, { message: "Confirm password must be at least 8 characters long" })
  confirmPassword!: string;
}