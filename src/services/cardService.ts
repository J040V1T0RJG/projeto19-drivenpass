import Cryptr from "cryptr";
import dotenv from "dotenv";

import { CardType } from "../types/cardTypes";
import * as cardRepository from "../repositores/cardRepository";
import { validateToken } from "../utils/validateToken";

dotenv.config();

const createCard = async (cardData: CardType) => {
    const { userId, title, password, securityCode } = cardData;
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);

    const titleData = await cardRepository.checkTitle(userId, title);

    if (titleData) {
        throw { code: "Conflict", message: "Titulo já existente" }
    };

    const encryptedPassword = cryptr.encrypt(password);
    const encryptedSecurityCode = cryptr.encrypt(securityCode);

    cardData.password = encryptedPassword;
    cardData.securityCode = encryptedSecurityCode;
    
    await cardRepository.createCard(cardData);
};

const getCards = async (cardId: number | undefined, authorization: string | undefined) => {
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);
    const {id: userId} = await validateToken(authorization);

    let cards: any[];

    if (cardId) {
        cards = await cardRepository.getCardsById(userId, cardId);
        if (cards.length === 0) {
            throw { code: "NotFound", message: "Cartão não existente e/ou pertencente a outro usuario" }
        };
    } else {
        cards = await cardRepository.getCards(userId);
    };

    cards.map((card: any, index: number) => {
        const descryptedPassword = cryptr.decrypt(card.password);
        const descryptedSecurityCode = cryptr.decrypt(card.securityCode);

        cards[index].password = descryptedPassword;
        cards[index].securityCode = descryptedSecurityCode;
    });

    return cards;
};

const deleteCard = async (cardId: number, authorization: string | undefined) => {
    const {id: userId} = await validateToken(authorization);

    const { count } = await cardRepository.deleteCardById(userId, cardId);

    if (count === 0) {
        throw { code: "NotFound", message: "Cartão não existente e/ou pertencente a outro usuario" }
    };
};

export {
    createCard,
    getCards,
    deleteCard
};