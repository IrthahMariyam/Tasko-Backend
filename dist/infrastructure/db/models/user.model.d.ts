import mongoose from "mongoose";
export declare const UserModel: mongoose.Model<{
    name: string;
    email: string;
    role: import("../../../domain/enum/user/role.enum").UserRole;
    password: string;
    isVerified: boolean;
    status: import("../../../domain/enum/user/status.enum").UserStatus;
    performanceScore: number;
    projects: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    role: import("../../../domain/enum/user/role.enum").UserRole;
    password: string;
    isVerified: boolean;
    status: import("../../../domain/enum/user/status.enum").UserStatus;
    performanceScore: number;
    projects: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    role: import("../../../domain/enum/user/role.enum").UserRole;
    password: string;
    isVerified: boolean;
    status: import("../../../domain/enum/user/status.enum").UserStatus;
    performanceScore: number;
    projects: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps & Required<{
    _id: mongoose.Types.ObjectId | null;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    email: string;
    role: import("../../../domain/enum/user/role.enum").UserRole;
    password: string;
    isVerified: boolean;
    status: import("../../../domain/enum/user/status.enum").UserStatus;
    performanceScore: number;
    projects: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    role: import("../../../domain/enum/user/role.enum").UserRole;
    password: string;
    isVerified: boolean;
    status: import("../../../domain/enum/user/status.enum").UserStatus;
    performanceScore: number;
    projects: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    role: import("../../../domain/enum/user/role.enum").UserRole;
    password: string;
    isVerified: boolean;
    status: import("../../../domain/enum/user/status.enum").UserStatus;
    performanceScore: number;
    projects: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps & Required<{
    _id: mongoose.Types.ObjectId | null;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    email: string;
    role: import("../../../domain/enum/user/role.enum").UserRole;
    password: string;
    isVerified: boolean;
    status: import("../../../domain/enum/user/status.enum").UserStatus;
    performanceScore: number;
    projects: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: mongoose.Types.ObjectId | null;
}> & {
    __v: number;
}>, {
    name: string;
    email: string;
    role: import("../../../domain/enum/user/role.enum").UserRole;
    password: string;
    isVerified: boolean;
    status: import("../../../domain/enum/user/status.enum").UserStatus;
    performanceScore: number;
    projects: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId | null | undefined;
    notificationPreferences?: {
        emailNotification?: boolean | null | undefined;
        pushNotification?: boolean | null | undefined;
    } | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: mongoose.Types.ObjectId | null;
}> & {
    __v: number;
}>;
