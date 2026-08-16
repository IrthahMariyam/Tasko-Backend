import { InferSchemaType } from "mongoose";
import { userSchema } from "../schema/user.schema";

export type IUser = InferSchemaType<typeof userSchema>;
