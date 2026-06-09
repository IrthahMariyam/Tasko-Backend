export interface IBaseRepository<T>{
    create(item: Partial<T>):Promise<T>
    findOne(filter: Record<string, unknown>):Promise<T | null>
    
}
