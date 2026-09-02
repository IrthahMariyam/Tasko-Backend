import mongoose from "mongoose";
import { designationSchema } from "../schema/designation.schema";
export const DesignationModel = mongoose.model("Designation", designationSchema);