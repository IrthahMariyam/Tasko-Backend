import mongoose from "mongoose";
import { logger } from "../../../shared/logger/logger";

const connectDB = async (): Promise<void> => {
  try {
    logger.info("MongoDB connection starting");

    await mongoose.connect(process.env.MONGO_URI as string);

    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
