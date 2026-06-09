import validate from "validator";
import { logger } from "../logger/logger";

export const validateEmail = (email: string): boolean => {

    if (!validate.isEmail(email)) {
        logger.warn("Invalid email format: ", email);
        return false;
    }
    return true;
};