import type { Request, Response } from "express";
import { sendError, sendResponse } from "../lib";
import { notFoundErrors, validationErrors } from "../contants";
import { addStudentSchema, createClassSchema } from "../validators";
import { Attendance, Class } from "../schemas";
import type { ObjectId } from "mongoose";

export async function createClassController(req: Request, res: Response) {
  const body = req.body();
  try {
    const userId = req.userId;
    const { data } = createClassSchema.safeParse(body);
    if (!data) {
      return sendError(res, validationErrors.invalidRequest, 400);
    }

    let classObj = new Class({
      className: data.classname,
      teacherId: userId,
    });

    classObj = await classObj.save();

    sendResponse(
      res,
      {
        _id: classObj._id,
        className: classObj.className,
        studentIds: classObj.studentIds,
      },
      201
    );
  } catch (error) {
    return sendError(res, validationErrors.internalServerError);
  }
}

export async function addStudentController(req: Request, res: Response) {
  const body = req.body();
  const id = req.params.id; 

  try {
    const { data } = addStudentSchema.safeParse(body);
    if (!data) {
      return sendError(res, validationErrors.invalidRequest, 400);
    }

    let existingClass = await Class.findByIdAndUpdate(id, 
      {
        $push: {
          studentIds: data.studentId,
        },
      }
    );

    if (!existingClass) {
      return sendError(res, notFoundErrors.class, 404);
    }

    sendResponse(
      res,
      {
        _id: existingClass._id,
        className: existingClass.className,
        studentIds: existingClass.studentIds,
      },
      201
    );
  } catch (error) {
    return sendError(res, validationErrors.internalServerError);
  }
}

export async function getClassController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const id = req.params.id; 

    const classObj = await Class.findById(id, {
      $or: [{ teacherId: userId }, { "studentIds._id": userId }],
    }).populate("studentIds");

    if (!classObj) {
      return sendError(res, notFoundErrors.class, 404);
    }

    return sendResponse(
      res,
      {
        _id: classObj._id,
        className: classObj.className,
        teacherId: classObj.teacherId,
        students: classObj.studentIds,
      },
      200
    );
  } catch (error) {
    return sendError(res, validationErrors.internalServerError);
  }
}

export async function myAttendanceController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const classId = req.params.id;

    const classObj = await Class.findById(classId);

    if (!classObj) {
      return sendError(res, notFoundErrors.class, 404);
    }

    if (!classObj.studentIds.includes(userId as any)) {
      return sendError(res, validationErrors.invalidRequest, 403);
    }

    const attendance = await Attendance.findOne({
      classId,
      studentId: userId,
    });

    return sendResponse(
      res,
      {
        classId,
        status: attendance?.status || null,
      },
      200
    );
  } catch (error) {
    return sendError(res, validationErrors.internalServerError);
  }
}
