import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { meController, loginController, signupController } from "../controllers";


const route = Router()

route.post("/signup", signupController)
route.post("/login", loginController)
route.post("/me", authMiddleware,  meController)


export  {route as authRoute}