import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Exclude, Expose } from "class-transformer";

@ValidatorConstraint({ name: "passwordMatch", async: false })
class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const dto = args.object as AdminRegisterDTO;
    return dto.password === confirmPassword;
  }

  defaultMessage() {
    return "Confirm password must match the password";
  }
}

@Exclude()
export class AdminRegisterDTO {
  @Expose()
  @IsString({ message: "Name must be a string" })
  @MinLength(3, { message: "Name must be at least 3 characters" })
  @MaxLength(20, { message: "Name cannot be more than 20 characters" })
  name!: string;

  @Expose()
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @Expose()
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20, { message: "Password cannot exceed 20 characters" })
  @Matches(/^(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain 1 uppercase letter and 1 number",
  })
  password!: string;

  @Expose()
  @IsString({ message: "Confirm password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20, { message: "Password cannot exceed 20 characters" })
  @Validate(PasswordMatchConstraint)
  confirmPassword!: string;
}
