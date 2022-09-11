import { prisma } from "../config/database";
import { IUserData, SessionData } from "../types/userTypes";

const checkEmail = async (email: string) => {
    return await prisma.users.findUnique({where: {email}})
};

const createUser = async (user: IUserData) => {
    await prisma.users.create({data: user});
};

const createOrUpdateToken = async (token: SessionData, userId: any) => {
    await prisma.sessions.upsert({
        create: token,
        update: token,
        where:  {userId: userId}
    });
};


export {
    checkEmail,
    createUser,
    createOrUpdateToken
};