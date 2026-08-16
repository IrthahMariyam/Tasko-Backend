import path from "node:path";
import { fileURLToPath } from "node:url";
import winston from "winston";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const logDir = path.resolve(currentDir, "../../../logs");

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} ${level}: ${stack ?? message}`;
  }),
);

const errorFilter = winston.format((info) =>
  info.level === "error" ? info : false,
);
const warnFilter = winston.format((info) =>
  info.level === "warn" ? info : false,
);
const infoFilter = winston.format((info) =>
  info.level === "info" ? info : false,
);
//info, error, warnings
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
      format: winston.format.combine(errorFilter(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "warn.log"),
      level: "warn",
      format: winston.format.combine(warnFilter(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "info.log"),
      level: "info",
      format: winston.format.combine(infoFilter(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
});

export const httpLogStream = {
  write(message: string) {
    logger.http(message.trim());
  },
};
