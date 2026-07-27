import {
 Request,
 Response,
 NextFunction
} from "express";

import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message";
import { container } from "../../../infrastructure/di/container/container";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { USER_TYPES } from "../../../infrastructure/di/types/user/user.types";
import { UserStatus } from "../../../domain/enum/user/status.enum";
import { CLIENT_ERROR_STATUS } from "../../../shared/constants/status-code/client-error.status";

export const authMiddleware = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {

 try {

   const authHeader =    req.headers.authorization;

   if (
     !authHeader ||
     !authHeader.startsWith(
       "Bearer "
     )
   ) {
     return res.status(401)
     .json({
       message: ERROR_MESSAGE.UNAUTHORIZED
     });
   }

   const token =  authHeader.split(" ")[1];

   const decoded =  jwt.verify( token, process.env.JWT_ACCESS_SECRET!
     ) as {
       id: string;
       role: string;
       email: string;
     };

   const userRepository = container.get<IUserRepository>(USER_TYPES.IUserRepository);
   const user = await userRepository.findById(decoded.id);

   if (!user) {
     return res.status(CLIENT_ERROR_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGE.USER_NOT_FOUND });
   }

   if (user.status === UserStatus.BLOCKED) {
     return res.status(CLIENT_ERROR_STATUS.FORBIDDEN).json({ message: ERROR_MESSAGE.ADMIN_BLOCKED });
   }

   req.user = {
     id: decoded.id,
     role: decoded.role,
     email: decoded.email,
   };

   next();

 } catch (error) {

   return res.status(401)
   .json({ message: ERROR_MESSAGE.INVALID_TOKEN });
 }
};