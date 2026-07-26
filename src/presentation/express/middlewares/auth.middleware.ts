import {
 Request,
 Response,
 NextFunction
} from "express";

import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message";

export const authMiddleware = (
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