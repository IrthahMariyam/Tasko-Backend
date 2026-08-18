import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: string;
        email?: string;
        name?: string;
        status?: string;
        designation?: string;
        joiningDate?: Date;
        profileImage?: string;
      };
    }
  }
}

export {};
