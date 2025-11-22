import {Router} from "express";
import { registerUserController } from "../controllers/users.controller.js"

const userRouter = Router();

userRouter.post("/register", registerUserController)

export default userRouter;