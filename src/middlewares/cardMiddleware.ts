import { Request, Response, NextFunction } from "express";
import * as cardSchema from "../schemas/cardSchema";
import { validateToken } from "../utils/validateToken";

const validateCreateCard = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { authorization } = req.headers;

    await validateToken(authorization);

    const { error } = cardSchema.createCardSchema.validate(body, { abortEarly: false });

    if (error) {
        throw { code: "UnprocessableEntity", message: "Dados invalidos" }
    };

    next();
};

export {
    validateCreateCard
};