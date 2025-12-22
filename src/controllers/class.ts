import type { Request, Response } from "express";
import { sendError, sendResponse } from "../lib";
import { notFoundErrors, validationErrors } from "../contants";
import { addStudentSchema, createClassSchema } from "../validators";
import { Class } from "../schemas";

export async function createClassController(req: Request, res: Response) {
  const body = req.body();
  try {
    const userId = req.userId;
    const { data } = createClassSchema.safeParse(body);
    if (!data) {
      return sendError(res, validationErrors.invalidRequest, 400);
    }

    const existingClass = await Class.findOne({
      teacherId: userId,
    });

    if (existingClass) {
      await Class.findById(existingClass._id);
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
  try {
    const userId = req.userId;
    const { data } = addStudentSchema.safeParse(body);
    if (!data) {
      return sendError(res, validationErrors.invalidRequest, 400);
    }

    let existingClass = await Class.findOneAndUpdate(
      {
        teacherId: userId,
      },
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

    const classObj = await Class.findOne({
      teacherId: userId,
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
  } catch (error) {
    return sendError(res, validationErrors.internalServerError);
  }
}
