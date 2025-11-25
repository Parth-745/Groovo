import {Router} from "express";
import { registerUserController } from "../controllers/users.controller.js"
import { verifyEmailController } from "../controllers/users.controller.js";
import { loginController } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.post("/register", registerUserController)
userRouter.post("/verify-email", verifyEmailController)
userRouter.post("/login", loginController)

export default userRouter;