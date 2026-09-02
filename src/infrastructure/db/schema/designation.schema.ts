import { Schema } from "mongoose";
export const designationSchema = new Schema(
  { name: { type: String, required: true, unique: true, trim: true } },
  { timestamps: true },
);
