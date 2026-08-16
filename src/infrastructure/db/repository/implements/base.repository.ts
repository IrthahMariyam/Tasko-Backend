import { Model } from "mongoose";
import { IBaseRepository } from "../interface/base.interface";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(item: Partial<T>): Promise<T> {
    return await this.model.create(item);
  }

  async findOne(filter: Record<string, unknown>): Promise<T | null> {
    return await this.model.findOne(filter);
  }
}
