import winston from "winston";
export declare const logger: winston.Logger;
export declare const httpLogStream: {
    write(message: string): void;
};
