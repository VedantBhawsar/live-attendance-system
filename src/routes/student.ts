import { Router } from "express";
import { getStudentController } from "../controllers/student";
import { authMiddleware } from "../middlewares";


const route = Router()

route.get("/", authMiddleware,  getStudentController)


export  {route as studentRoute}