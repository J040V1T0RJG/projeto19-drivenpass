import { Request, Response, NextFunction } from "express";
import * as userSchema from "../schemas/userSchema"

const validateSignIn = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const { error } = userSchema.signInSchema.validate(body, { abortEarly: false });

    if (error) {
        throw { code: "UnprocessableEntity", message: "Dados invalidos" }
    };

    next();
};

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const { error } = userSchema.signUpSchema.validate(body, { abortEarly: false });

    if (error) {
        throw { code: "UnprocessableEntity", message: "Dados invalidos" }
    };

    next();
};

export {
    validateSignIn,
    validateSignUp
};