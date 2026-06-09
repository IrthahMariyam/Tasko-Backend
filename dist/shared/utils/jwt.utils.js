// import jwt, { Secret, SignOptions } from "jsonwebtoken";
// type Payload = {
//   userId: string;
//   role: string;
// };
// export const generateAccessToken = (
//   payload: Payload
// ): string => {
// const secret = process.env.JWT_ACCESS_SECRET;
// if (!secret) throw new Error("JWT_ACCESS_SECRET is required");
//   const options: SignOptions = {
//     expiresIn:  "15m", 
//   };
//   return jwt.sign(payload, secret, options);
// };
import jwt from 'jsonwebtoken';
import { logger } from '../logger/logger.js';
const access_secret = process.env.JWT_ACCESS_SECRET || "access_secret";
const refresh_secret = process.env.JWT_REFRESH_SECRET || "refresh_secret";
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, access_secret, { expiresIn: '15m' });
};
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, refresh_secret, { expiresIn: '7d' });
};
export const verifyAccessToken = (token, type) => {
    const secret = type === 'access' ? access_secret : refresh_secret;
    try {
        return jwt.verify(token, secret);
    }
    catch (err) {
        const error = err;
        if (error.name === 'TokenExpiredError') {
            console.log('Token is Expired');
            logger.warn('Token is Expired');
        }
        else {
            logger.error('Token is invalid', error.message);
            console.log('Token is invalid', error.message);
        }
    }
};
//# sourceMappingURL=jwt.utils.js.map