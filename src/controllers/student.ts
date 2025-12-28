import type { Request, Response } from "express";
import { sendError, sendResponse } from "../lib";
import { validationErrors } from "../contants";
import { User } from "../schemas";

export async function getStudentController(req: Request, res: Response) {
    try {
        const students = await User.find({
            role: "student"
        }, {
            password: 0, 
            role: 0
        })

        const transformData = students.map(student=> ({
            _id: student._id, 
            name: student.name, 
            email: student.email
        }))
        return sendResponse(res, transformData, 200) 
    } catch (error) {
        return sendError(res, validationErrors.internalServerError)
    }
}