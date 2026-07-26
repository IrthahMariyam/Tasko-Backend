import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class SetPasswordDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  token!: string;

  @Expose()
  @IsString()
  @MinLength(8)
  password!: string;

  @Expose()
  @IsString()
  @MinLength(8)
  confirmPassword!: string;
}
