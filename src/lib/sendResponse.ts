import type { Response } from "express";
import { success } from "zod";

export function sendResponse(res: Response, data: any, status: number) {
  return res.status(status).json({
    success: true,
    data: data,
  });
}

export function sendError(res: Response, message: string, status?: number) {
  return res.status(status || 500).json({
    success: false,
    error: message,
  });
}
