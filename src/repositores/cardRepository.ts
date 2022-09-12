import { prisma } from "../config/database";
import { CardType } from "../types/cardTypes";

const checkTitle = async (userId: number, title: string) => {
    return await prisma.cards.findUnique({
        where: {
            userId_title: {
                userId,
                title
            }
        }
    });
};

const createCard = async (card: CardType) => {
    await prisma.cards.create({data: card});
};

const getCards = async (userId: number) => {
    return await prisma.cards.findMany({where: {userId}});
};

const getCardsById = async (userId: number, cardId: number) => {
    return await prisma.cards.findMany({
        where: {
            AND: [
                {userId}, {id: cardId}
            ]}
    });
};

const deleteCardById = async (userId: number, cardId: number) => {
    return await prisma.cards.deleteMany({
        where: {
            AND: [
                {userId}, {id: cardId}
            ]}
    });
};

export {
    checkTitle,
    createCard,
    getCards,
    getCardsById,
    deleteCardById
};