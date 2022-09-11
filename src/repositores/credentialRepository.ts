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

const getCredentials = async (userId: number) => {
    return await prisma.credentials.findMany({where: {userId}});
};

const getCredentialsById = async (userId: number, credentialId: number) => {
    return await prisma.credentials.findMany({
        where: {
            AND: [
                {userId}, {id: credentialId}
            ]}
    });
};

const deleteCredentialById = async (userId: number, credentialId: number) => {
    return await prisma.credentials.deleteMany({
        where: {
            AND: [
                {userId}, {id: credentialId}
            ]}
    });
};

export {
    checkTitle,
    createCredential,
    getCredentials,
    getCredentialsById,
    deleteCredentialById
};