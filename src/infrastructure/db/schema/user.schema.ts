import { Schema } from "mongoose";
import { UserRole } from "../../../domain/enum/user/role.enum";
import { UserStatus } from "../../../domain/enum/user/status.enum";

export const userSchema = new Schema(
  {       
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
   name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, 
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    status:{
      type:String,
      enum:Object.values(UserStatus),
      default:UserStatus.ACTIVE
    },
     isVerified: { type: Boolean, default: false },
    performanceScore: {
      type: Number,
      default: 0,
    },
   
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    notificationPreferences: {
      emailNotification: {
        type: Boolean,
       
      },
      pushNotification: {
        type: Boolean,
       
      },
    },
  
  },
 
{
    timestamps: true, 
}
)