import jwt from "jsonwebtoken";
import {  Types } from "mongoose";
import { envConfig } from "../config/env";
import type { Role } from "../types";

export function signJWT(userId: Types.ObjectId, role: Role) {
  return jwt.sign(
    {
      userId,
      role,
    },
    envConfig.JWT_SECRET!
  );
}

export function verifyJWT(token: string) {
  return jwt.verify(token, envConfig.JWT_SECRET!);
}

export function decodeJWT(token: string){
    return jwt.decode(token)
}
