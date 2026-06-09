export declare const hashPassword: (plainPassword: string) => Promise<string>;
export declare const comparePassword: (plainPassword: string, hashedPassword: string) => Promise<boolean>;
