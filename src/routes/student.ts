import { Router } from "express";
import { getStudentController } from "../controllers/student";
import { authMiddleware, requireTeacherRole } from "../middlewares";


const route = Router()

route.get("/", authMiddleware, requireTeacherRole, getStudentController)


export  {route as studentRoute}