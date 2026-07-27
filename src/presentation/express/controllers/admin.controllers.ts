import { inject, injectable } from "inversify";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message"; 
import { SUCCESS_STATUS } from "../../../shared/constants/status-code/success.status";
import { ADMIN_TYPES } from "../../../infrastructure/di/types/admin/admin.types";
import { NextFunction, Request, Response } from "express";
import { CLIENT_ERROR_STATUS } from "../../../shared/constants/status-code/client-error.status";
import { IInviteMemberUseCase } from "../../../application/usecases/admin/interface/invite.member.interface";
import { IVerifyInvitationUseCase } from "../../../application/usecases/admin/interface/verify.member.interface";
import { IListMembersUseCase } from "../../../application/usecases/admin/interface/list.members.interface";
import { IUpdateMemberStatusUseCase } from "../../../application/usecases/admin/interface/update.member.interface";
import { UserStatus } from "../../../domain/enum/user/status.enum";
import { NotFoundError } from "../../../shared/utils/error-handling/errors/not.found.error"; 

@injectable()
export class AdminController {
    constructor(

        @inject(ADMIN_TYPES.IInviteMemberUseCase)
        private _inviteMemberUseCase: IInviteMemberUseCase,
        @inject(ADMIN_TYPES.IVerifyInvitationUseCase)
        private _verifyInvitationUseCase: IVerifyInvitationUseCase,
        @inject(ADMIN_TYPES.IListMembersUseCase)
        private _listUserUseCase: IListMembersUseCase,
        @inject(ADMIN_TYPES.IUpdateMemberStatusUseCase)
        private _updateMemberStatusUseCase: IUpdateMemberStatusUseCase
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
                    message: ERROR_MESSAGE.ONLY_ADMINS_CAN_INVITE_MEMBERS
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
                    message: ERROR_MESSAGE.INVITATION_EXPIRED_OR_INVALID
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

    async blockMember(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user?.role !== "ADMIN") {
                return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({ success: false, message: ERROR_MESSAGE.ONLY_ADMINS_CAN_VIEW_MEMBERS });
            }

            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            if (!id) {
                return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({ success: false, message: ERROR_MESSAGE.INVALID_USER_ID });
            }

            const result = await this._updateMemberStatusUseCase.execute(id, UserStatus.BLOCKED);
            return res.status(SUCCESS_STATUS.OK).json({ success: true, message: result.message });
        } catch (error) {
            next(error);
        }
    }

    async unblockMember(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user?.role !== "ADMIN") {
                return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({ success: false, message: ERROR_MESSAGE.ONLY_ADMINS_CAN_VIEW_MEMBERS });
            }

            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            if (!id) {
                return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({ success: false, message: ERROR_MESSAGE.INVALID_USER_ID });
            }

            const result = await this._updateMemberStatusUseCase.execute(id, UserStatus.ACTIVE);
            return res.status(SUCCESS_STATUS.OK).json({ success: true, message: result.message });
        } catch (error) {
            next(error);
        }
    }

    async listUsers(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user?.role !== "ADMIN") {
                return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({
                    success: false,
                    message: ERROR_MESSAGE.ONLY_ADMINS_CAN_VIEW_MEMBERS
                });
            }

            const page = parseInt((req.query.page as string) ?? "1", 10) || 1;
            const limit = parseInt((req.query.limit as string) ?? "10", 10) || 10;
            const search = (req.query.search as string) ?? undefined;

            const response = await this._listUserUseCase.execute({ page, limit, search });
            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                data: response.data,
                meta: { total: response.total, page: response.page, limit: response.limit },
            });
        } catch (error) {
            next(error);
        }
    }



}
