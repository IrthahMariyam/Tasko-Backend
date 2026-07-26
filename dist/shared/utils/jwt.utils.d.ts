import jwt from 'jsonwebtoken';
export declare const generateAccessToken: (payload: object) => string;
export declare const generateRefreshToken: (payload: object) => string;
export declare const verifyToken: (token: string, type: "access" | "refresh") => string | jwt.JwtPayload | undefined;
