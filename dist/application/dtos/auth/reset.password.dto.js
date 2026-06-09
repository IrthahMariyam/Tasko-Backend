var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, } from "class-transformer";
import { IsString, Matches, MaxLength, MinLength, Validate, ValidatorConstraint, IsEmail, } from "class-validator";
let PasswordMatchConstraint = class PasswordMatchConstraint {
    validate(confirmPassword, args) {
        const obj = args.object;
        return obj.newPassword === confirmPassword;
    }
    defaultMessage(args) {
        return "Confirm password must match the new password";
    }
};
PasswordMatchConstraint = __decorate([
    ValidatorConstraint({ name: "passwordMatch", async: false })
], PasswordMatchConstraint);
export { PasswordMatchConstraint };
export class ResetPasswordDTO {
    email;
    newPassword;
    confirmPassword;
    constructor() {
        this.email = "";
        this.newPassword = "";
        this.confirmPassword = "";
    }
}
__decorate([
    Expose(),
    IsEmail({}, { message: "Invalid email format" }),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "email", void 0);
__decorate([
    Expose(),
    IsString({ message: "Password must be a string" }),
    MinLength(8, { message: "Password must be at least 8 characters long" }),
    MaxLength(20, { message: "Password cannot be longer than 20 characters" }),
    Matches(/^(?=.*[A-Z])(?=.*\d)/, {
        message: "Password must contain at least one uppercase letter and one number",
    }),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "newPassword", void 0);
__decorate([
    Expose(),
    IsString({ message: "Confirm password must be a string" }),
    MinLength(8, { message: "Confirm password must be at least 8 characters long" }),
    MaxLength(20, { message: "Confirm password cannot be longer than 20 characters" }),
    Validate(PasswordMatchConstraint),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "confirmPassword", void 0);
//# sourceMappingURL=reset.password.dto.js.map