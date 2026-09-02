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
import { UserRole } from "../../../domain/enum/user/role.enum";
import { ValidationError } from "../../../shared/utils/error-handling/errors/validation.error";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { USER_TYPES } from "../../../infrastructure/di/types/user/user.types";
import { DesignationModel } from "../../../infrastructure/db/models/designation.model";

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
    private _updateMemberStatusUseCase: IUpdateMemberStatusUseCase,
    @inject(USER_TYPES.IUserRepository)
    private _userRepository: IUserRepository,
  ) {}

  async inviteMember(req: Request, res: Response, next: NextFunction) {
    try {
      const invitedBy = req.user?.id;

      if (!invitedBy) {
        throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
      }

      const currentRole = req.user?.role?.toUpperCase();
      const requestedRole = (req.body.role as string | undefined)?.toUpperCase();

      if (currentRole === UserRole.SUPER_ADMIN && requestedRole !== UserRole.ADMIN) {
        throw new ValidationError(ERROR_MESSAGE.ONLY_SUPER_ADMINS_CAN_INVITE_ADMINS);
      }

      if (currentRole === UserRole.ADMIN && requestedRole !== UserRole.USER) {
        throw new ValidationError(ERROR_MESSAGE.ONLY_ADMINS_CAN_INVITE_MEMBERS);
      }

      if (currentRole !== UserRole.ADMIN && currentRole !== UserRole.SUPER_ADMIN) {
        return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({
          success: false,
          message: ERROR_MESSAGE.ONLY_ADMINS_CAN_INVITE_MEMBERS,
        });
      }

      const designation = String(req.body.designation ?? "").trim().replace(/\s+/g, " ").toUpperCase();
      const designationExists = designation && await DesignationModel.exists({ name: { $regex: `^${designation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } });
      if (!designationExists) {
        throw new ValidationError(ERROR_MESSAGE.INVALID_DESIGNATION);
      }
      req.body.designation = designation;

      const result = await this._inviteMemberUseCase.execute(
        req.body,
        invitedBy,
      );

      return res.status(SUCCESS_STATUS.OK).json({
        success: true,
        message: result.message,
        inviteLink: result.inviteLink,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyInvitation(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGE.INVITATION_EXPIRED_OR_INVALID,
        });
      }

      const data = await this._verifyInvitationUseCase.execute(token);

      return res.status(SUCCESS_STATUS.OK).json({
        success: true,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async blockMember(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== "ADMIN" && req.user?.role !== "SUPER_ADMIN") {
        return res
          .status(CLIENT_ERROR_STATUS.FORBIDDEN)
          .json({
            success: false,
            message: ERROR_MESSAGE.ONLY_ADMINS_CAN_VIEW_MEMBERS,
          });
      }

      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      if (!id) {
        return res
          .status(CLIENT_ERROR_STATUS.BAD_REQUEST)
          .json({ success: false, message: ERROR_MESSAGE.INVALID_USER_ID });
      }

      if (id === req.user?.id) {
        return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({
          success: false,
          message: "You cannot block your own account.",
        });
      }

      const result = await this._updateMemberStatusUseCase.execute(
        id,
        UserStatus.BLOCKED,
        req.user.role as UserRole,
      );
      return res
        .status(SUCCESS_STATUS.OK)
        .json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async unblockMember(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== "ADMIN" && req.user?.role !== "SUPER_ADMIN") {
        return res
          .status(CLIENT_ERROR_STATUS.FORBIDDEN)
          .json({
            success: false,
            message: ERROR_MESSAGE.ONLY_ADMINS_CAN_VIEW_MEMBERS,
          });
      }

      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      if (!id) {
        return res
          .status(CLIENT_ERROR_STATUS.BAD_REQUEST)
          .json({ success: false, message: ERROR_MESSAGE.INVALID_USER_ID });
      }

      if (id === req.user?.id) {
        return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({
          success: false,
          message: "You cannot unblock your own account.",
        });
      }

      const result = await this._updateMemberStatusUseCase.execute(
        id,
        UserStatus.ACTIVE,
        req.user.role as UserRole,
      );
      return res
        .status(SUCCESS_STATUS.OK)
        .json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async updateMemberDesignation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const designation = String(req.body.designation ?? "").trim().replace(/\s+/g, " ").toUpperCase();

      if (!id || !designation) {
        return res.status(CLIENT_ERROR_STATUS.BAD_REQUEST).json({
          success: false,
          message: "A designation is required.",
        });
      }

      const actorRole = req.user?.role as UserRole | undefined;
      if (actorRole !== UserRole.ADMIN && actorRole !== UserRole.SUPER_ADMIN) {
        return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({
          success: false,
          message: "Only admins and super admins can edit designations.",
        });
      }

      const member = await this._userRepository.findById(id);
      if (!member) throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);

      const canUpdateDesignation =
        (actorRole === UserRole.ADMIN && member.role === UserRole.USER) ||
        (actorRole === UserRole.SUPER_ADMIN && member.role === UserRole.ADMIN);

      if (!canUpdateDesignation) {
        throw new ValidationError(
          actorRole === UserRole.ADMIN
            ? "Admins can edit employee designations only."
            : "Super admins can edit admin designations only.",
        );
      }

      const designationExists = await DesignationModel.exists({
        name: { $regex: `^${designation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
      });
      if (!designationExists) {
        throw new ValidationError("Select a valid designation.");
      }

      member.setDesignation(designation);
      const updatedMember = await this._userRepository.update(member);

      return res.status(SUCCESS_STATUS.OK).json({
        success: true,
        data: {
          id: updatedMember.id,
          designation: updatedMember.designation,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== "ADMIN" && req.user?.role !== "SUPER_ADMIN") {
        return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({
          success: false,
          message: ERROR_MESSAGE.ONLY_ADMINS_CAN_VIEW_MEMBERS,
        });
      }

      const page = parseInt((req.query.page as string) ?? "1", 10) || 1;
      const limit = parseInt((req.query.limit as string) ?? "10", 10) || 10;
      const search = (req.query.search as string) ?? undefined;

      const response = await this._listUserUseCase.execute({
        page,
        limit,
        search,
      });
      return res.status(SUCCESS_STATUS.OK).json({
        success: true,
        data: response.data,
        meta: {
          total: response.total,
          page: response.page,
          limit: response.limit,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
