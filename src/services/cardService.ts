import Cryptr from "cryptr";
import dotenv from "dotenv";

import { CardType } from "../types/cardTypes";
import * as cardRepository from "../repositores/cardRepository";

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

export {
    createCard
};