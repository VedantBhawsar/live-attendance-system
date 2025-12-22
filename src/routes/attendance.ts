import { Router } from "express";
import { requireTeacherRole } from "../middlewares";
import { startAttendanceController } from "../controllers";


const route = Router()

route.post("/start", requireTeacherRole, startAttendanceController)



export  {route as attendanceRoute}