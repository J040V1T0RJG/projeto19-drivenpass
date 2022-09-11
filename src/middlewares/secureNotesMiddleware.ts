import { Request, Response, NextFunction } from "express";
import * as secureNotesSchema from "../schemas/secureNotesSchema";
import { validateToken } from "../utils/validateToken";


const validateCreateSecureNotes = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { authorization } = req.headers;

    await validateToken(authorization);

    const { error } = secureNotesSchema.validateSecureNotesSchema.validate(body, { abortEarly: false });

    if (error) {
        throw { code: "UnprocessableEntity", message: "Dados invalidos" }
    };

    next();
};

export {
    validateCreateSecureNotes
};