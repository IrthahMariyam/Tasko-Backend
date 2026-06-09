import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  IsEnum 
} from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { UserRole } from "../../../domain/enum/user/role.enum";

@Exclude()
export class InviteMemberDTO {

  @Expose()
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @Expose()
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @Expose()
  @IsEnum(UserRole, { message: "Role must be ADMIN or USER" })
  @IsNotEmpty({ message: "Role is required" })
  role!: UserRole;

}
