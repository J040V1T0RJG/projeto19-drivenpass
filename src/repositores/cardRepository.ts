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

export {
    checkTitle,
    createCard
};