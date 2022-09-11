import { prisma } from "../config/database";
import { SecureNotesType } from "../types/secureNotesTypes";

const checkTitle = async (userId: number, title: string) => {
    return await prisma.secureNotes.findUnique({
        where: {
            userId_title: {
                userId,
                title
            }
        }
    });
};

const createSecureNotes = async (secureNotes: SecureNotesType) => {
    await prisma.secureNotes.create({data: secureNotes});
};

export {
    checkTitle,
    createSecureNotes
};