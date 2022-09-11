import { Request, Response, NextFunction } from "express";
import * as credentialSchema from "../schemas/credentialSchema";
import { validateToken } from "../utils/validateToken";

const validateCreateCredential = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { authorization } = req.headers;

    await validateToken(authorization);

    const { error } = credentialSchema.createCredentialSchema.validate(body, { abortEarly: false });

    if (error) {
        throw { code: "UnprocessableEntity", message: "Dados invalidos" }
    };

    next();
};

export {
    validateCreateCredential
};