import { UserRole } from "../enum/user/role.enum";
import { UserStatus } from "../enum/user/status.enum";
import { hashPassword } from "../../shared/utils/password.hash.util";
export class User {
    _id;
    _name;
    _email;
    _password;
    _role;
    _status;
    isVerified = false;
    createdAt = new Date();
    updatedAt = new Date();
    constructor(props) {
        this._id = props.id;
        this._name = props.name;
        this._email = props.email;
        this._password = props.password;
        this._role = props.role;
        this._status = props.status;
        this.isVerified = props.isVerified ?? false;
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
    }
    static create(props) {
        return new User({
            id: props.id,
            name: props.name,
            email: props.email,
            password: props.password,
            role: props.role,
            status: props.status,
            isVerified: props.isVerified,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get email() { return this._email; }
    get password() { return this._password; }
    get role() { return this._role; }
    get status() { return this._status; }
    async gethashedPassword() {
        return await hashPassword(this.password);
    }
    setPassword(newPassword) {
        this._password = newPassword;
        this.updatedAt = new Date();
    }
    isBlocked() {
        // if(this._status === UserStatus.BLOCKED) throw new Error(ERROR_MESSAGE.ADMIN_BLOCKED)
        return this._status === UserStatus.BLOCKED;
    }
    verifyUser() {
        this.isVerified = true;
        this._status = UserStatus.ACTIVE;
        this.updatedAt = new Date();
    }
    canLogin() {
        return this.isVerified && this.status === UserStatus.ACTIVE;
    }
    isAdmin() {
        return this.role === UserRole.ADMIN;
    }
}
//# sourceMappingURL=User.js.map