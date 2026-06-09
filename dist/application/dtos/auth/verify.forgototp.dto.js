var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsString, Length } from "class-validator";
import { Exclude, Expose } from "class-transformer";
let VerifyForgotOtpDTO = class VerifyForgotOtpDTO {
    email;
    otp;
    constructor() {
        this.email = "";
        this.otp = "";
    }
};
__decorate([
    Expose(),
    IsEmail({}, { message: "Invalid email format" }),
    __metadata("design:type", String)
], VerifyForgotOtpDTO.prototype, "email", void 0);
__decorate([
    Expose(),
    IsString({ message: "OTP must be a string" }),
    Length(6, 6, { message: "OTP must be  6 characters long" }),
    __metadata("design:type", String)
], VerifyForgotOtpDTO.prototype, "otp", void 0);
VerifyForgotOtpDTO = __decorate([
    Exclude(),
    __metadata("design:paramtypes", [])
], VerifyForgotOtpDTO);
export { VerifyForgotOtpDTO };
//# sourceMappingURL=verify.forgototp.dto.js.map