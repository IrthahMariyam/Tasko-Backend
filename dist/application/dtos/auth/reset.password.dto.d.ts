import { ValidatorConstraintInterface, ValidationArguments } from "class-validator";
export declare class PasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class ResetPasswordDTO {
    email: string;
    newPassword: string;
    confirmPassword: string;
    constructor();
}
