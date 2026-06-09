import { inject, injectable } from "inversify";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message"; 
import { SUCCESS_STATUS } from "../../../shared/constants/status-code/success.status";
import { ADMIN_TYPES } from "../../../infrastructure/di/types/admin/admin.types";
import { NextFunction, Request, Response } from "express";
import { CLIENT_ERROR_STATUS } from "../../../shared/constants/status-code/client-error.status";
import { IInviteMemberUseCase } from "../../../application/usecases/admin/interface/invite.member.interface";
import { IVerifyInvitationUseCase } from "../../../application/usecases/admin/interface/verify.member.interface";
import { IListMembersUseCase } from "../../../application/usecases/admin/interface/list.members.interface";
import { NotFoundError } from "../../../shared/utils/error-handling/errors/not.found.error"; 

@injectable()
export class AdminController {
    constructor(

        @inject(ADMIN_TYPES.IInviteMemberUseCase)
        private _inviteMemberUseCase: IInviteMemberUseCase,
        @inject(ADMIN_TYPES.IVerifyInvitationUseCase)
        private _verifyInvitationUseCase: IVerifyInvitationUseCase,
        @inject(ADMIN_TYPES.IListMembersUseCase)
        private _listUserUseCase: IListMembersUseCase
    ) { }

    async inviteMember(req: Request, res: Response, next: NextFunction) {
        try {

            
            const invitedby = req.user?.id

                if (!invitedby) {
                throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND)
            }

            if (req.user?.role !== "ADMIN") {
                return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({
                    success: false,
                    message: "Only admins can invite members"
                })
            }

            const result = await this._inviteMemberUseCase.execute(req.body,invitedby)


            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                message: result.message,
                inviteLink: result.inviteLink
            })
        } catch (error) {

            next(error)

        }
    }

    async verifyInvitation(req: Request, res: Response, next: NextFunction) {
        try {

            console.log('reaching the verify');

            const { token } = req.body
            console.log(token);

            if (!token) {
                return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Tocken is Expired"
                })
            }

            const data = await this._verifyInvitationUseCase.execute(token)

            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                data: data,
            })

        } catch (error) {
            next(error)
        }
    }

    async listUsers(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user?.role !== "ADMIN") {
                return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({
                    success: false,
                    message: "Only admins can view members"
                });
            }

            const response = await this._listUserUseCase.execute();
            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                data: response.data
            });
        } catch (error) {
            next(error);
        }
    }



}
