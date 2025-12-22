import type { NextFunction, Request, Response } from "express";
import { sendError, verifyJWT } from "../lib";
import { validationErrors } from "../contants";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer ")) {
    return sendError(res, validationErrors.unautorized, 401);
  }

  const token = authheader.split(" ")[1];

  if (!token) {
    return sendError(res, validationErrors.unautorized, 401);
  }

  try {
    const user = verifyJWT(token);

    if (typeof user === "string" || !user) {
      return sendError(res, validationErrors.unautorized, 401);
    }

    req.userId = user.userId;
    req.role = user.role;

    next();
  } catch (error) {
    return sendError(res, validationErrors.unautorized, 401);
  }
}
