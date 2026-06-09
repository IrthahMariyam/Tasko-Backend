import mongoose from "mongoose";
import { userSchema } from "../schema/user.schema";

export const UserModel = mongoose.model("User", userSchema);