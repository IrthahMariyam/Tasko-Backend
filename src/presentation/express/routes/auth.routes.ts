import { Router } from "express";
import { container } from "../../../infrastructure/di/container/container";
import { USER_TYPES } from "../../../infrastructure/di/types/user/user.types";
import { AuthController } from "../../../presentation/express/controllers/auth.controller";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { LoginDTO } from "../../../application/dtos/auth/login.dto";
import { SetPasswordDTO } from "../../../application/dtos/auth/set.password.dto";
import { ForgotPasswordDTO } from "../../../application/dtos/auth/forgot.password.dto";
import { VerifyForgotOtpDTO } from "../../../application/dtos/auth/verify.forgototp.dto";
import { ResetPasswordDTO } from "../../../application/dtos/auth/reset.password.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { comparePassword, hashPassword } from "../../../shared/utils/password.hash.util";
import { UserModel } from "../../../infrastructure/db/models/user.model";

const router = Router();

const authController = container.get<AuthController>(USER_TYPES.AuthController);

router.post("/login", validateDto(LoginDTO), (req, res, next) =>
  authController.login(req, res, next),
);
router.post(
  "/forgot-password",
  validateDto(ForgotPasswordDTO),
  (req, res, next) => authController.forgotPassword(req, res, next),
);
router.post(
  "/resend-forgot-otp",
  validateDto(ForgotPasswordDTO),
  (req, res, next) => authController.forgotPassword(req, res, next),
);
router.post(
  "/verify-otp",
  validateDto(VerifyForgotOtpDTO),
  (req, res, next) => authController.verifyOtp(req, res, next),
);
router.post(
  "/reset-password",
  validateDto(ResetPasswordDTO),
  (req, res, next) => authController.resetPassword(req, res, next),
);
router.post(
  "/change-password/send-otp",
  authMiddleware,
  (req, res, next) => {
    req.body = { email: req.user!.email };
    authController.forgotPassword(req, res, next);
  },
);
router.post(
  "/change-password/verify-otp",
  authMiddleware,
  (req, res, next) => {
    req.body = { ...req.body, email: req.user!.email };
    next();
  },
  validateDto(VerifyForgotOtpDTO),
  (req, res, next) => authController.verifyOtp(req, res, next),
);
router.post(
  "/change-password/reset",
  authMiddleware,
  (req, res, next) => {
    req.body = { ...req.body, email: req.user!.email };
    next();
  },
  validateDto(ResetPasswordDTO),
  (req, res, next) => authController.resetPassword(req, res, next),
);
router.post("/set-password", validateDto(SetPasswordDTO), (req, res, next) =>
  authController.setPassword(req, res, next),
);
router.post("/logout", (req, res, next) =>
  authController.logout(req, res, next),
);
router.post("/refresh", (req, res, next) =>
  authController.refresh(req, res, next),
);
router.get("/me", authMiddleware, (req, res, next) =>
  authController.me(req, res, next),
);
router.patch("/profile/image", authMiddleware, (req, res, next) =>
  authController.updateProfileImage(req, res, next),
);
export { router as authRouter };

router.patch("/profile/password", authMiddleware, async (req, res, next) => { try { const { currentPassword, newPassword, confirmPassword } = req.body; if (!req.user?.id || !currentPassword || !newPassword || newPassword.length < 8 || newPassword !== confirmPassword) return res.status(400).json({ success: false, message: "Check your password details." }); const user = await UserModel.findById(req.user.id); if (!user || !(await comparePassword(currentPassword, user.password))) return res.status(400).json({ success: false, message: "Current password is incorrect." }); user.password = await hashPassword(newPassword); await user.save(); return res.json({ success: true, message: "Password changed successfully." }); } catch (error) { next(error); } });