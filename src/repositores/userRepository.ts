import { prisma } from "../config/database";
import { IUserData } from "../types/userTypes";

const checkEmail = async (email: string) => {
    return await prisma.users.findUnique({where: {email}})
};

const createUser = async (user: IUserData) => {
    await prisma.users.create({ data: user });
};

export {
    checkEmail,
    createUser
};