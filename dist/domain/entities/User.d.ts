import { UserRole } from "../enum/user/role.enum";
import { UserStatus } from "../enum/user/status.enum";
export declare class User {
    private readonly _id?;
    private _name;
    private _email;
    private _password;
    private _role;
    private _status;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(props: {
        readonly id?: string;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        status: UserStatus;
        isVerified?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
    });
    static create(props: {
        id?: string;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        status: UserStatus;
        isVerified: boolean;
    }): User;
    get id(): string | undefined;
    get name(): string;
    get email(): string;
    get password(): string;
    get role(): UserRole;
    get status(): UserStatus;
    gethashedPassword(): Promise<string>;
    setPassword(newPassword: string): void;
    isBlocked(): boolean;
    verifyUser(): void;
    canLogin(): boolean;
    isAdmin(): boolean;
}
