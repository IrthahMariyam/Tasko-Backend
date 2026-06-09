import { Model } from "mongoose";
import { IBaseRepository } from "../interface/base.interface";
export declare abstract class BaseRepository<T> implements IBaseRepository<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    create(item: Partial<T>): Promise<T>;
    findOne(filter: Record<string, unknown>): Promise<T | null>;
}
