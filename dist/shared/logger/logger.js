import path from "node:path";
import { fileURLToPath } from "node:url";
import winston from "winston";
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const logDir = path.resolve(currentDir, "../../../logs");
const logFormat = winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.errors({ stack: true }), winston.format.json());
const consoleFormat = winston.format.combine(winston.format.colorize(), winston.format.timestamp({ format: "HH:mm:ss" }), winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} ${level}: ${stack ?? message}`;
}));
export const logger = winston.createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new winston.transports.Console({
            format: consoleFormat,
        }),
        new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
        }),
        new winston.transports.File({
            filename: path.join(logDir, "combined.log"),
        }),
    ],
});
export const httpLogStream = {
    write(message) {
        logger.http(message.trim());
    },
};
//# sourceMappingURL=logger.js.map