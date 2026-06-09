import { Schema } from "mongoose";
import { UserRole } from "../../../domain/enum/user/role.enum";
import { UserStatus } from "../../../domain/enum/user/status.enum";
export declare const userSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    email: string;
    role: UserRole;
    password: string;
    isVerified: boolean;
    status: UserStatus;
    performanceScore: number;
    projects: import("mongoose").Types.ObjectId[];
    _id?: import("mongoose").Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    role: UserRole;
    password: string;
    isVerified: boolean;
    status: UserStatus;
    performanceScore: number;
    projects: import("mongoose").Types.ObjectId[];
    _id?: import("mongoose").Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    role: UserRole;
    password: string;
    isVerified: boolean;
    status: UserStatus;
    performanceScore: number;
    projects: import("mongoose").Types.ObjectId[];
    _id?: import("mongoose").Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps & Required<{
    _id: import("mongoose").Types.ObjectId | null;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    email: string;
    role: UserRole;
    password: string;
    isVerified: boolean;
    status: UserStatus;
    performanceScore: number;
    projects: import("mongoose").Types.ObjectId[];
    _id?: import("mongoose").Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: import("mongoose").Types.ObjectId | null;
}> & {
    __v: number;
}>;
