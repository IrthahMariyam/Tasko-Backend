var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
let ResetPasswordDTO = class ResetPasswordDTO {
    email;
    newPassword;
    confirmPassword;
};
__decorate([
    Expose(),
    IsEmail({}, { message: "Enter a valid email address" }),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "email", void 0);
__decorate([
    Expose(),
    IsString({ message: "Password must be a string" }),
    MinLength(8, { message: "Password must be at least 8 characters" }),
    MaxLength(64, { message: "Password cannot exceed 64 characters" }),
    Matches(/^(?=.*[A-Z])(?=.*\d)/, { message: "Password must contain 1 uppercase letter and 1 number" }),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "newPassword", void 0);
__decorate([
    Expose(),
    IsString({ message: "Confirm password must be a string" }),
    MinLength(8, { message: "Confirm password must be at least 8 characters" }),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "confirmPassword", void 0);
ResetPasswordDTO = __decorate([
    Exclude()
], ResetPasswordDTO);
export { ResetPasswordDTO };
//# sourceMappingURL=reset.password.dto.js.map