import mongoose from "mongoose";
import { logger } from "../../../shared/logger/logger";
const connectDB = async () => {
    try {
        logger.info("MongoDB connection starting");
        await mongoose.connect(process.env.MONGO_URI);
        logger.info("MongoDB connected successfully");
    }
    catch (error) {
        logger.error("MongoDB connection error", error);
        process.exit(1);
    }
};
export default connectDB;
/**
 * const connectd=async():Promise<void>=>{
 * try{
 * await mongoogse.connect(process.env.MONGO_URL as string)
 * }catch(error){
 * logger.error("mongodb connection error",error)}}
 */ 
//# sourceMappingURL=connect.db.js.map