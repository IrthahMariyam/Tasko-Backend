import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "../../../infrastructure/db/mongoose/connect.db";
import { redisClient } from "../../../infrastructure/providers/redis/redis.provider";
import { httpLogStream, logger } from "../../../shared/logger/logger";
import { authRouter } from "../routes/auth.routes";
import { adminRouter } from "../routes/admin.routes";
dotenv.config();
const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
];
app.use(helmet());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Tasko API Running...");
});
app.use("/api/auth", authRouter);
app.use('/api/admin', adminRouter);
app.use((error, req, res, next) => {
    logger.error(error.message, error);
    res.status(error.statusCode ?? 400).json({
        message: error.message,
        errors: Array.isArray(error.data) ? error.data : undefined,
    });
});
const startServer = async () => {
    await connectDB();
    await redisClient.connect();
    const port = process.env.PORT ?? 5000;
    app.listen(port, () => {
        logger.info(`Server running on ${port} `);
    });
};
startServer().catch((error) => {
    logger.error("Server startup failed", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map