import { IVerifyInvitationUseCase } from "../interface/verify.member.interface";
export declare class VerifyInvitationUseCase implements IVerifyInvitationUseCase {
    constructor();
    execute(token: string): Promise<{
        name: string;
        email: string;
        role: string;
    }>;
}
