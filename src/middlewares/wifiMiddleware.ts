import { Request, Response, NextFunction } from "express";
import * as wifiSchema from "../schemas/wifiSchema"
import { validateToken } from "../utils/validateToken";

const validateCreateWifi = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { authorization } = req.headers;

    await validateToken(authorization);

    const { error } = wifiSchema.createWifiSchema.validate(body, { abortEarly: false });

    if (error) {
        throw { code: "UnprocessableEntity", message: "Dados invalidos" }
    };

    next();
};

export {
    validateCreateWifi
};