import {
  IsString,
  IsEmail,
  IsNotEmpty,
 
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
  password!: string;
}


