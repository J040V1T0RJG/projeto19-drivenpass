import { Router } from "express";
import * as userController from "../controllers/userController";
import * as userMiddleware from "../middlewares/userMiddleware";

const userRouter = Router();

userRouter.post("/sign-in", userController.signIn);
userRouter.post("/sign-up", userMiddleware.validateSignUp, userController.signUp);

export default userRouter;