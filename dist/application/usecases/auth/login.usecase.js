import { comparePassword } from "../../../shared/utils/password.hash.util.js";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message.js";
import { SUCCESS_MESSAGE } from "../../../shared/constants/messages/success.message.js";
export class LoginUseCase {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(email, password) {
        const user = await this.userRepo.findByEmail(email);
        if (!user)
            throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch)
            throw new Error(ERROR_MESSAGE.INVALID_PASSWORD);
        if (!user.canLogin()) {
            throw new Error(ERROR_MESSAGE.USER_NOT_VERIFIED_OR_BLOCKED);
        }
        const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
        return {
            message: SUCCESS_MESSAGE.LOGIN_SUCCESS,
            accessToken,
        };
    }
}
//# sourceMappingURL=login.usecase.js.map