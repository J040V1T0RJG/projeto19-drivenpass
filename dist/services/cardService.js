"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.getCards = exports.createCard = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
const cardRepository = __importStar(require("../repositores/cardRepository"));
const validateToken_1 = require("../utils/validateToken");
dotenv_1.default.config();
const createCard = (cardData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, password, securityCode } = cardData;
    const cryptr = new cryptr_1.default(`${process.env.SECRET_PASSWORD}`);
    const titleData = yield cardRepository.checkTitle(userId, title);
    if (titleData) {
        throw { code: "Conflict", message: "Titulo já existente" };
    }
    ;
    const encryptedPassword = cryptr.encrypt(password);
    const encryptedSecurityCode = cryptr.encrypt(securityCode);
    cardData.password = encryptedPassword;
    cardData.securityCode = encryptedSecurityCode;
    yield cardRepository.createCard(cardData);
});
exports.createCard = createCard;
const getCards = (cardId, authorization) => __awaiter(void 0, void 0, void 0, function* () {
    const cryptr = new cryptr_1.default(`${process.env.SECRET_PASSWORD}`);
    const { id: userId } = yield (0, validateToken_1.validateToken)(authorization);
    let cards;
    if (cardId) {
        cards = yield cardRepository.getCardsById(userId, cardId);
        if (cards.length === 0) {
            throw { code: "NotFound", message: "Cartão não existente e/ou pertencente a outro usuario" };
        }
        ;
    }
    else {
        cards = yield cardRepository.getCards(userId);
    }
    ;
    cards.map((card, index) => {
        const descryptedPassword = cryptr.decrypt(card.password);
        const descryptedSecurityCode = cryptr.decrypt(card.securityCode);
        cards[index].password = descryptedPassword;
        cards[index].securityCode = descryptedSecurityCode;
    });
    return cards;
});
exports.getCards = getCards;
const deleteCard = (cardId, authorization) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = yield (0, validateToken_1.validateToken)(authorization);
    const { count } = yield cardRepository.deleteCardById(userId, cardId);
    if (count === 0) {
        throw { code: "NotFound", message: "Cartão não existente e/ou pertencente a outro usuario" };
    }
    ;
});
exports.deleteCard = deleteCard;
