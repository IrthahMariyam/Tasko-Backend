import { NextFunction, Request, Response } from "express";
import { IInviteMemberUseCase } from "../../../application/usecases/admin/interface/invite.member.interface";
import { IVerifyInvitationUseCase } from "../../../application/usecases/admin/interface/verify.member.interface";
import { IListMembersUseCase } from "../../../application/usecases/admin/interface/list.members.interface";
export declare class AdminController {
    private _inviteMemberUseCase;
    private _verifyInvitationUseCase;
    private _listUserUseCase;
    constructor(_inviteMemberUseCase: IInviteMemberUseCase, _verifyInvitationUseCase: IVerifyInvitationUseCase, _listUserUseCase: IListMembersUseCase);
    inviteMember(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    verifyInvitation(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    listUsers(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
