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
import { IsString, MinLength, MaxLength, Matches, IsNotEmpty, } from "class-validator";
let SetPasswordDTO = class SetPasswordDTO {
    token;
    password;
    confirmPassword;
};
__decorate([
    Expose(),
    IsString(),
    IsNotEmpty({ message: "Token is required" }),
    __metadata("design:type", String)
], SetPasswordDTO.prototype, "token", void 0);
__decorate([
    Expose(),
    IsString(),
    MinLength(8, { message: "Password must be at least 8 characters long" }),
    MaxLength(20, { message: "Password cannot exceed 20 characters" }),
    Matches(/^(?=.*[A-Z])(?=.*\d)/, {
        message: "Password must contain 1 uppercase letter and 1 number",
    }),
    __metadata("design:type", String)
], SetPasswordDTO.prototype, "password", void 0);
__decorate([
    Expose(),
    IsString(),
    MinLength(8, { message: "Confirm password must be at least 8 characters long" }),
    __metadata("design:type", String)
], SetPasswordDTO.prototype, "confirmPassword", void 0);
SetPasswordDTO = __decorate([
    Exclude()
], SetPasswordDTO);
export { SetPasswordDTO };
//# sourceMappingURL=set.password.dto.js.map