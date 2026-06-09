import { IsEmail, IsString, Length } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class VerifyForgotOtpDTO {
    @Expose()
    @IsEmail({}, { message: "Invalid email format" })
    email: string

    @Expose()
    @IsString({ message: "OTP must be a string" })
    @Length(6,6 , { message: "OTP must be  6 characters long" })
    otp: string

    constructor() {
        this.email = ""
        this.otp = ""
    }
}
