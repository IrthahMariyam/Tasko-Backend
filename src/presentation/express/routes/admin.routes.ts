import { ADMIN_TYPES } from "../../../infrastructure/di/types/admin/admin.types";
import { AdminController } from "../controllers/admin.controllers";
import { container } from "../../../infrastructure/di/container/container";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Router } from "express";
import { InviteMemberDTO } from "../../../application/dtos/admin/invite.member.dto";

const router=Router()

const adminController = container.get<AdminController>(ADMIN_TYPES.AdminController)
// const AuthMware =container.get<authMiddleware>(ADMIN_TYPES.authMiddleware)


router.post('/verify-members',(req,res,next)=>adminController.verifyInvitation(req,res,next))
router.post('/members/invite',authMiddleware,validateDto(InviteMemberDTO),(req,res,next)=>adminController.inviteMember(req,res,next))
router.get('/members',authMiddleware,(req,res,next)=>adminController.listUsers(req,res,next))

export {router as adminRouter}