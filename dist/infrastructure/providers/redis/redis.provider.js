import { Redis } from "ioredis";
import { logger } from "../../../shared/logger/logger";
export const redisClient = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
    lazyConnect: true,
});
redisClient.on("error", (err) => {
    logger.error("Redis error:", err);
});
redisClient.on("connect", () => {
    logger.info("Redis client connected");
});
redisClient.on("ready", () => {
    logger.info("Redis client ready");
});
redisClient.on("end", () => {
    logger.warn("Redis connection closed");
});
redisClient.on("reconnecting", () => {
    logger.info("Redis reconnecting...");
});
// export const connectRedis = async () => {
//   try {
//     await redisClient.connect();
//     logger.info("Redis connected");
//   } catch (error) {
//     logger.error("Redis connection failed, continuing without Redis");
//   }
// };
//# sourceMappingURL=redis.provider.js.map