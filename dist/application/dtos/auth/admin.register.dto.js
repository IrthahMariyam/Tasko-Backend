var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsEmail, MinLength, MaxLength, Matches, Validate, ValidatorConstraint, } from "class-validator";
import { Exclude, Expose } from "class-transformer";
let PasswordMatchConstraint = class PasswordMatchConstraint {
    validate(confirmPassword, args) {
        const dto = args.object;
        return dto.password === confirmPassword;
    }
    defaultMessage() {
        return "Confirm password must match the password";
    }
};
PasswordMatchConstraint = __decorate([
    ValidatorConstraint({ name: "passwordMatch", async: false })
], PasswordMatchConstraint);
let AdminRegisterDTO = class AdminRegisterDTO {
    name;
    email;
    password;
    confirmPassword;
};
__decorate([
    Expose(),
    IsString({ message: "Name must be a string" }),
    MinLength(3, { message: "Name must be at least 3 characters" }),
    MaxLength(20, { message: "Name cannot be more than 20 characters" }),
    __metadata("design:type", String)
], AdminRegisterDTO.prototype, "name", void 0);
__decorate([
    Expose(),
    IsEmail({}, { message: "Invalid email format" }),
    __metadata("design:type", String)
], AdminRegisterDTO.prototype, "email", void 0);
__decorate([
    Expose(),
    IsString({ message: "Password must be a string" }),
    MinLength(8, { message: "Password must be at least 8 characters long" }),
    MaxLength(20, { message: "Password cannot exceed 20 characters" }),
    Matches(/^(?=.*[A-Z])(?=.*\d)/, {
        message: "Password must contain 1 uppercase letter and 1 number",
    }),
    __metadata("design:type", String)
], AdminRegisterDTO.prototype, "password", void 0);
__decorate([
    Expose(),
    IsString({ message: "Confirm password must be a string" }),
    MinLength(8, { message: "Password must be at least 8 characters long" }),
    MaxLength(20, { message: "Password cannot exceed 20 characters" }),
    Validate(PasswordMatchConstraint),
    __metadata("design:type", String)
], AdminRegisterDTO.prototype, "confirmPassword", void 0);
AdminRegisterDTO = __decorate([
    Exclude()
], AdminRegisterDTO);
export { AdminRegisterDTO };
//# sourceMappingURL=admin.register.dto.js.map