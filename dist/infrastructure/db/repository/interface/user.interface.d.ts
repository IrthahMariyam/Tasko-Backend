export interface IUserRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}
