import { prisma } from "../config/database";
import { CredentialData } from "../types/credentialTypes";

const checkTitle = async (userId: number, title: string) => {
    return await prisma.credentials.findUnique({
        where: {
            userId_title: {
                userId,
                title
            }
        }
    });
};

const createCredential = async (credential: CredentialData) => {
    await prisma.credentials.create({data: credential});
};

export {
    checkTitle,
    createCredential
};