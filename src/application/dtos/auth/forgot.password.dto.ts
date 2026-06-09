import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator'

export class ForgotPasswordDTO {

    @Expose()
    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    constructor() {
        this.email = ''
    }

}

