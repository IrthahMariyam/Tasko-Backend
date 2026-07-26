import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

@Exclude()
export class ForgotPasswordDTO {
  @Expose()
  @IsEmail({}, { message: "Enter a valid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;
}
