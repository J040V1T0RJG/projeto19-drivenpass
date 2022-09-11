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

const getSecureNotes = async (userId: number) => {
    return await prisma.secureNotes.findMany({where: {userId}});
};

const getSecureNotesById = async (userId: number, secureNotesId: number) => {
    return await prisma.secureNotes.findMany({
        where: {
            AND: [
                {userId}, {id: secureNotesId}
            ]}
    });
};

const deleteSecureNotesById = async (userId: number, secureNotesId: number) => {
    return await prisma.secureNotes.deleteMany({
        where: {
            AND: [
                {userId}, {id: secureNotesId}
            ]}
    });
};

export {
    checkTitle,
    createSecureNotes,
    getSecureNotes,
    getSecureNotesById,
    deleteSecureNotesById
};