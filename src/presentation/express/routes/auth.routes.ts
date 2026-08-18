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
  "/verify-forgot-otp",
  validateDto(VerifyForgotOtpDTO),
  (req, res, next) => authController.verifyForgotOtp(req, res, next),
);
router.post(
  "/reset-password",
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
