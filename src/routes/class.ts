import { Router } from "express";
import { authMiddleware, requireTeacherRole } from "../middlewares";
import { addStudentController, createClassController, getClassController, myAttendanceController } from "../controllers";


const route = Router()

route.post("/",requireTeacherRole ,createClassController)
route.post("/:id/add-student",requireTeacherRole,  addStudentController)
route.get("/:id", authMiddleware,  getClassController)
route.get("/:id/my-attendance", myAttendanceController)

export  {route as classRoute}