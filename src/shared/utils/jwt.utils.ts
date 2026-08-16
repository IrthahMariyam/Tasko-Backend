import jwt from "jsonwebtoken";
import { logger } from "../logger/logger.js";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (payload: object): string => {
  const secret = process.env.JWT_ACCESS_SECRET as string;
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES as jwt.SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (payload: object): string => {
  const secret = process.env.JWT_REFRESH_SECRET as string;
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES as jwt.SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret =
    type === "access"
      ? (process.env.JWT_ACCESS_SECRET as string)
      : (process.env.JWT_REFRESH_SECRET as string);
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    const error = err as Error;

    if (error.name === "TokenExpiredError") {
      console.log("Token is Expired");
      logger.warn("Token is Expired");
    } else {
      logger.error("Token is invalid", error.message);
      console.log("Token is invalid", error.message);
    }
  }
};
