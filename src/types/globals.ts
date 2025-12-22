import type { Role } from "./role";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      role: Role;
    }
  }
}