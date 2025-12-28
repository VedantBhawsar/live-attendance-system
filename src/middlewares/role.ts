import type { NextFunction, Request, Response } from "express";
import { validationErrors } from "../contants";
import { sendError } from "../lib";
import { User } from "../schemas";

export function requireTeacherRole() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, validationErrors.teacherAccessRequired, 403);
    }
    if (user.role === "teacher") {
      next();
    } else {
      return sendError(res, validationErrors.teacherAccessRequired, 403);
    }
  };
}
export function requireStudentRole() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, validationErrors.teacherAccessRequired, 403);
    }
    if (user.role === "student") {
      next();
    } else {
      return sendError(res, validationErrors.teacherAccessRequired, 403);
    }
  };
}
