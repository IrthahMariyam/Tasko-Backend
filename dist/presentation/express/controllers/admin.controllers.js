var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "inversify";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message";
import { SUCCESS_STATUS } from "../../../shared/constants/status-code/success.status";
import { ADMIN_TYPES } from "../../../infrastructure/di/types/admin/admin.types";
import { CLIENT_ERROR_STATUS } from "../../../shared/constants/status-code/client-error.status";
import { NotFoundError } from "../../../shared/utils/error-handling/errors/not.found.error";
let AdminController = class AdminController {
    _inviteMemberUseCase;
    _verifyInvitationUseCase;
    _listUserUseCase;
    constructor(_inviteMemberUseCase, _verifyInvitationUseCase, _listUserUseCase) {
        this._inviteMemberUseCase = _inviteMemberUseCase;
        this._verifyInvitationUseCase = _verifyInvitationUseCase;
        this._listUserUseCase = _listUserUseCase;
    }
    async inviteMember(req, res, next) {
        try {
            const invitedby = req.user?.id;
            if (!invitedby) {
                throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
            }
            if (req.user?.role !== "ADMIN") {
                return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({
                    success: false,
                    message: "Only admins can invite members"
                });
            }
            const result = await this._inviteMemberUseCase.execute(req.body, invitedby);
            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                message: result.message,
                inviteLink: result.inviteLink
            });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyInvitation(req, res, next) {
        try {
            console.log('reaching the verify');
            const { token } = req.body;
            console.log(token);
            if (!token) {
                return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Tocken is Expired"
                });
            }
            const data = await this._verifyInvitationUseCase.execute(token);
            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                data: data,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async listUsers(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
};
AdminController = __decorate([
    injectable(),
    __param(0, inject(ADMIN_TYPES.IInviteMemberUseCase)),
    __param(1, inject(ADMIN_TYPES.IVerifyInvitationUseCase)),
    __param(2, inject(ADMIN_TYPES.IListMembersUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controllers.js.map