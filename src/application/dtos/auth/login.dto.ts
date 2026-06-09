import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches
} from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class LoginDTO {
  @Expose()
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @Expose()
  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20, { message: "Password cannot exceed 20 characters" })
  @Matches(/^(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain 1 uppercase letter and 1 number",
    })
  password!: string;
}


