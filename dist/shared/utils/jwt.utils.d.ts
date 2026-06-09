import jwt from 'jsonwebtoken';
export declare const generateAccessToken: (payload: object) => string;
export declare const generateRefreshToken: (payload: object) => string;
export declare const verifyAccessToken: (token: string, type: "access" | "refresh") => string | jwt.JwtPayload | undefined;
