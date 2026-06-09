import {
    Expose,
} from "class-transformer";
import {
    IsString,
    Matches,
    MaxLength,
    MinLength,
    Validate,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    IsEmail,
} from "class-validator";


@ValidatorConstraint({ name: "passwordMatch", async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments) {
        const obj = args.object as ResetPasswordDTO;
        return obj.newPassword === confirmPassword;
    }

    defaultMessage(args: ValidationArguments) {
        return "Confirm password must match the new password";
    }
}


export class ResetPasswordDTO {

    @Expose()
    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @Expose()
    @IsString({ message: "Password must be a string" })
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @MaxLength(20, { message: "Password cannot be longer than 20 characters" })
    @Matches(/^(?=.*[A-Z])(?=.*\d)/, {
        message: "Password must contain at least one uppercase letter and one number",
    })
    newPassword: string;

    @Expose()
    @IsString({ message: "Confirm password must be a string" })
    @MinLength(8, { message: "Confirm password must be at least 8 characters long" })
    @MaxLength(20, { message: "Confirm password cannot be longer than 20 characters" })
    @Validate(PasswordMatchConstraint)
    confirmPassword: string;

    constructor() {
        this.email = "";
        this.newPassword = "";
        this.confirmPassword = "";
    }
}