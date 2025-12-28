import type { Request, Response } from "express";
import { sendError, sendResponse } from "../lib";
import { notFoundErrors, validationErrors } from "../contants";
import { startAttendanceSchema } from "../validators";
import { Class } from "../schemas";
import { activeSessions } from "../memory/activeSession";

export async function startAttendanceController(req: Request, res: Response) {
  try {
    const userId = req.userId
    const body = req.body
    const {data} =  startAttendanceSchema.safeParse(body)
    
    if(!data) {
      return sendError(res, validationErrors.invalidRequest, 400)
    }


    const existingclass = await Class.findOne({
      _id: data.classId, 
    })


    if(!existingclass){
      return sendError(res, notFoundErrors.class, 404)
    }

    if(String(existingclass.teacherId) !== userId) {
      return sendError(res, validationErrors.invalidRequest, 403)
    }


    activeSessions.classId = data.classId
    activeSessions.startedAt = new Date().toISOString(); 
    activeSessions.attendance = {} 
    


    return sendResponse(res, {
      classId: activeSessions.classId, 
      startedAt: activeSessions.startedAt
    }, 200);
  } catch (error) {
    return sendError(res, validationErrors.internalServerError, 500);
  }
}
