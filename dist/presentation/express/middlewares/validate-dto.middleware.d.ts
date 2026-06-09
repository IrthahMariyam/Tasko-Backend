import { NextFunction, Request, Response } from "express";
type DtoClass<T extends object> = new () => T;
export declare const validateDto: <T extends object>(dtoClass: DtoClass<T>) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
