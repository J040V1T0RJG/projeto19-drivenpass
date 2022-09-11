import { prisma } from "../config/database";
import jwt from "jsonwebtoken";
import { string } from "joi";

const validateToken = async (authorization: string | undefined): Promise<{email: string, id: number, iat: number}> => {
    const token = authorization?.replace("Bearer", "").trim();

    if (!token) {
        throw { code: "Unauthorized", message: "Token necessario" }
    };

    const tokenData = await prisma.sessions.findUnique({where: {token}})

    if (!tokenData) {
        throw { code: "Unauthorized", message: "Token invalido" }
    };

    const d1 = Date.now();
    const d2 = tokenData.creationDate;
    const diff = d1 - Date.parse(`${d2}`);
    const oneHour = 3600000;

    if (diff > oneHour) {
        throw { code: "Unauthorized", message: "Token expirado, faça login novamente" }
    };

    const userData = <{email: string, id: number, iat: number}>jwt.decode(token);

    return userData;
};

export {
    validateToken
};